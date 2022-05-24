import os
import numpy as np
import cv2
import datetime
import requests
import uuid

import login

def center(x, y, w, h):
    x1 = int(w / 2)
    y1 = int(h / 2)
    cx = x + x1
    cy = y + y1

    return cx,cy

cap = cv2.VideoCapture('6.1.mp4')

fgbg = cv2.createBackgroundSubtractorMOG2()

detects = []

# token
token = login.Logar('paulo@gmail.com', 'paulo123')

if(token == False):
    print('Login Inválido')
    exit()

# header para as requisições
headers = {
    "Authorization" : "Bearer %s" % token
}

offset = 15
xy1 = (0, 0)
xy2 = (0, 0)
xy1_ = (0, 0)
xy2_ = (0, 0)
posL = 0
posL_ = 0


def PosicionarLinhas():

    global posL
    global posL_
    global xy1
    global xy2
    global xy1_
    global xy2_

    resposta = requests.get('http://localhost/v1/lines', headers=headers, verify=False)
        
    if(resposta.status_code == 403):
        print('Unauthorized')
        exit()

    #  LINHA 1
    # posição da linha de detecção na vertical - MarginTop
    posL = int(resposta.json()['data'][0]['marginTop'])
    # margem para a esquerda
    xy1 = (int(resposta.json()['data'][0]['marginLeft']), posL)
    # largura da linha
    xy2 = (int(resposta.json()['data'][0]['width']), posL)

    # LINHA 2
    # posição da linha de detecção na vertical - MarginTop
    posL_ = int(resposta.json()['data'][1]['marginTop'])
    # margem para a esquerda
    xy1_ = (int(resposta.json()['data'][1]['marginLeft']), posL_)
    # largura da linha
    xy2_ = (int(resposta.json()['data'][1]['width']), posL_)

PosicionarLinhas()

# total de pessoas que passaram no ambiente desde a execução do script até a sua finalização
total_ = 0

# total de pessoas no ambiente em tempo real
total = 0

up = 0
down = 0

tempoCalculado = datetime.datetime.now().time()
calcularTempo = False
enviarRequisicao = False

tempo = datetime.datetime.now().time()
contarTempo = False

# Função que faz o envio de alertas
def CalcularTempo(quantidade):
    global tempoCalculado
    global calcularTempo
    global enviarRequisicao

    if(quantidade > 0):
        
        if(calcularTempo == False):
            tempoCalculado = datetime.datetime.now().time()
            calcularTempo = True

        segundos = int(str(datetime.datetime.now().time()).split(':')[2].split('.')[0]) - int(str(tempoCalculado).split(':')[2].split('.')[0])
        
        if(segundos > 4 and enviarRequisicao == False):
            enviarRequisicao = True
            print('Enviando requisição...')

            if(cap.isOpened()):
                Id_ = uuid.uuid4()
                cv2.imwrite(str(Id_)+'.jpg',frame)
                files = { "Imagem": open(str(Id_)+'.jpg', "rb") }
                data = { 'amountOfPeople': quantidade }

                requests.post('http://localhost/v1/alert/register', files=files, data=data, verify=False)

                files['Imagem'].close()
                
                try:
                    os.remove(str(Id_)+'.jpg')
                except OSError as ex:
                    print('Error removing image')

        if(segundos == 15):
            print('Há pessoas na área de risco')
            if(cap.isOpened()):
                Id_ = uuid.uuid4()
                cv2.imwrite(str(Id_)+'.jpg',frame)
                files = { "Imagem": open(str(Id_)+'.jpg', "rb") }
                data = { 'amountOfPeople': quantidade }

                requests.post('http://localhost/v1/alert/register', files=files, data=data, verify=False)

                files['Imagem'].close()

                try:
                    os.remove(str(Id_)+'.jpg')
                except OSError as ex:
                    print('Error removing image')


    if(quantidade == 0 and enviarRequisicao == True):

        if(cap.isOpened()):
            Id_ = uuid.uuid4()
            cv2.imwrite(str(Id_)+'.jpg',frame)
            files = { "Imagem": open(str(Id_)+'.jpg', "rb") }
            data = { 'amountOfPeople': quantidade }

            requests.post('http://localhost/v1/alert/register', files=files, data=data, verify=False)
            
            files['Imagem'].close()
            try:
                os.remove(str(Id_)+'.jpg')
            except OSError as ex:
                print('Error removing image')

            print('As pessoas saíram da área de risco')

            calcularTempo = False
            enviarRequisicao = False


# Função que conta quanto tempo as pessoas ficaram na área de risco
def ContarTempo(quantidade):
    global contarTempo
    global tempo

    if (quantidade > 0 and contarTempo == False):
        tempo = datetime.datetime.now().time()

        contarTempo = True

    if (quantidade == 0):
        horas = int(str(datetime.datetime.now().time()).split(':')[0]) - int(str(tempo).split(':')[0])
        minutos = int(str(datetime.datetime.now().time()).split(':')[1]) - int(str(tempo).split(':')[1])
        segundos = int(str(datetime.datetime.now().time()).split(':')[2].split('.')[0]) - int(str(tempo).split(':')[2].split('.')[0])

        print(str(horas) + 'h:' + str(minutos) + 'm:' + str(segundos) + 's')

        contarTempo = False
        tempo = datetime.datetime.now().time()


while 1:
    ret, frame = cap.read()

    # deixa a imagem em cinza
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # aplica a máscara de cinza
    fgmask = fgbg.apply(gray)

    retval, th = cv2.threshold(fgmask, 200, 255, cv2.THRESH_BINARY)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))

    opening = cv2.morphologyEx(th, cv2.MORPH_OPEN, kernel, iterations = 2)

    dilation = cv2.dilate(opening,kernel,iterations = 8)

    closing = cv2.morphologyEx(dilation, cv2.MORPH_CLOSE, kernel, iterations = 8)

    # linhas de detecção
    # serve apenas para mostrar o ponto de detecção
    cv2.line(frame,xy1,xy2,(255,0,0),2)

    cv2.line(frame,xy1_,xy2_,(255,0,0),2)

    contours, hierarchy = cv2.findContours(dilation,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

    i = 0
    for cnt in contours:
        (x,y,w,h) = cv2.boundingRect(cnt)

        area = cv2.contourArea(cnt)
        
        if int(area) >= 4800:
            centro = center(x, y, w, h)

            # texto que aparece no frame da pessoa
            cv2.putText(frame, str(i), (x+5, y+15), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255),2)

            # coloca um circulo no ponto central do retangulo
            cv2.circle(frame, centro, 4, (0, 0,255), -1)

            # faz o retangulo em volta da pessoa
            cv2.rectangle(frame,(x,y),(x+w,y+h),(0,0,255),2)

            if len(detects) <= i:
                detects.append([])

            def adicionarArray():

                if centro[1] > posL-offset and centro[1] < posL+offset:
                    detects[i].append(centro)
                    
                if centro[1] > posL_-offset and centro[1] < posL_+offset:
                    detects[i].append(centro)

            adicionarArray()

            i += 1

    if i == 0:
        detects.clear()

    i = 0

    if len(contours) == 0:
        detects.clear()

    else:

        for detect in detects:
            # l = eixo y
            CalcularTempo(total)
            for (c,l) in enumerate(detect):

                if detect[c-1][1] < posL and l[1] > posL:
                    linha = 2
                    detect.clear()
                    up+=1
                    total_+=1
                    if total < 0:
                        total = 0
                    else:
                        total+=1
                    ContarTempo(total)
                    cv2.line(frame,xy1,xy2,(0,0,0),2)
                    continue
                
                if detect[c-1][1] > posL and l[1] < posL:
                    linha = 2
                    detect.clear()
                    down+=1
                    total_+=1
                    if total < 0:
                        total = 0
                    else:
                        total-=1
                    ContarTempo(total)
                    cv2.line(frame,xy1,xy2,(0,0,0),5)
                    continue

                if c > 0:
                    cv2.line(frame,detect[c-1],l,(0,0,255),1)


                if detect[c-1][1] < posL_ and l[1] > posL_ :
                    linha = 1
                    detect.clear()
                    down+=1
                    total_+=1
                    if total < 0:
                        total = 0
                    else:
                        total-=1
                    ContarTempo(total)
                    cv2.line(frame,xy1_,xy2_,(0,0,0),2)
                    continue

                # detecta as pessoas que desceram
                if detect[c-1][1] > posL_ and l[1] < posL_:
                    linha = 1
                    detect.clear()
                    up+=1
                    total_+=1
                    if total < 0:
                        total = 0
                    else:
                        total+=1
                    ContarTempo(total)
                    cv2.line(frame,xy1_,xy2_,(0,0,0),2)
                    continue

                if c > 0:
                    cv2.line(frame,detect[c-1],l,(0,0,255),1)

    # cv2.putText(frame, "TOTAL DE PESSOAS NA AREA: "+str(total), (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255),2)
    # cv2.putText(frame, "ENTRADAS: "+str(up), (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0),2)
    # cv2.putText(frame, "SAIDAS: "+str(down), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255),2)

    cv2.imshow("frame", cv2.rotate(frame, cv2.ROTATE_90_COUNTERCLOCKWISE))

    # fps do video 
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()