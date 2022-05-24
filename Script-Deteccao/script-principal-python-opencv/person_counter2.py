import numpy as np
import cv2
import datetime
from datetime import timedelta
from time import sleep

def center(x, y, w, h):
    x1 = int(w / 2)
    y1 = int(h / 2)
    cx = x + x1
    cy = y + y1
    return cx,cy

cap = cv2.VideoCapture('2.mp4')

fgbg = cv2.createBackgroundSubtractorMOG2()

detects = []

# posição da linha de detecção na vertical
posL = 300
posL_ = 60
offset = 15

# (linha) margin para a esquerda
xy1 = (1, posL)
# (linha) largura
xy2 = (250, posL)

xy1_ = (1, posL_)
xy2_ = (250, posL_)

total = 0
total_ = 0

up = 0
down = 0


def Timer(id, tempo):

    # listaPessoas.append( ('id', id, 'tempo', tempo) )

    # print(str(listaPessoas[0][3]))
    return ''

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
    # cv2.imshow("closing", closing)

    # linha central bottom
    # serve apenas para marcar o ponto de detecção
    cv2.line(frame,xy1,xy2,(0,0,255),2)

    cv2.line(frame,xy1_,xy2_,(0,255,0),2)

    # linha central top
    # cv2.line(frame,(0, 100),xy3,(255,0,0),2)
    # cv2.line(frame,(0, 100),xy3,(255,0,0),2)

    # linha left
    cv2.line(frame,(1, 500),(1, 0),(0,0,0),2)

    # linha right
    cv2.line(frame,(250, 300),(250, 60), (0,255,0),2)


    # cor da linha de cima
    # cv2.line(frame,(xy1[0],posL-offset),(xy2[0],posL-offset),(150,255,0),1)

    # cor da linha de baixo
    # cv2.line(frame,(xy1[0],posL+offset),(xy2[0],posL+offset),(255,255,0),1)

    contours, hierarchy = cv2.findContours(dilation,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    i = 0
    for cnt in contours:
        (x,y,w,h) = cv2.boundingRect(cnt)

        area = cv2.contourArea(cnt)
        
        if int(area) > 1500 :
            centro = center(x, y, w, h)

            # texto que aparece no frame da pessoa
            cv2.putText(frame, str(str(i) + ' ' + str(Timer(i, datetime.datetime.now().time()))), (x+5, y+15), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255),2)

            # coloca um circulo no ponto central do retangulo
            cv2.circle(frame, centro, 4, (0, 0,255), -1)

            # faz o retangulo em volta da pessoa
            cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,0),2)

            if len(detects) <= i:
                detects.append([])

            # centro[1] eixo y = posição da pessoa
            # if centro[1] > posL-offset and centro[1] < posL+offset:
            #     detects[i].append(centro)

            centro_1 = 0
            centro_2 = 0
            linha = 0
            def adicionarArray():
                global centro_1
                global centro_2
                global linha

                if centro[1] > posL-offset and centro[1] < posL+offset:
                    centro_1 = centro[1] - posL-offset
                    
                if centro[1] > posL_-offset and centro[1] < posL_+offset:
                    centro_2 = centro[1] - posL_-offset

                if centro_1 > centro_2:
                    linha = 1
                    detects[i].append(centro)
                
                if centro_1 < centro_2:
                    linha = 2
                    detects[i].append(centro)

            adicionarArray()
            # else:
            #     detects[i].clear()

            i += 1

    if i == 0:
        detects.clear()

    i = 0

    if len(contours) == 0:
        detects.clear()

    else:

        for detect in detects:
            # c = eixo x, l = eixo y
            for (c,l) in enumerate(detect):

                # print(str(l))
                # print(str(c))

                # posição Y da pessoa
                # print(str(detect[c-1][1]))

                # print(str(l))
                # detecta as pessoas que subiram
                # no detect, pega o índice do numero c - 1, esse número c pode ser, 0, 2, 3 ou 4, depende,
                # e dentro desse objeto que pegamos, vamos pegar o índice 1, que é a posição dele em relação a linha,
                # se for por exemplo 142 e for menor do que o posL que é 150, significa que ele está acima da linha,
                # e se o numero l for maior que 150, significa que ele subiu, então limpamos o array detect e adiciona-mos
                # um na variavel up, e adicionamos 1 no total de pessoas

                # se detect[c-1][1] for menor que o posL e L[1] for maior que posL, significa que a pessoa passou pela linha
                # if linha == 1:
                # print(linha)
                if detect[c-1][1] < posL and l[1] > posL:
                    linha = 2
                    detect.clear()
                    up+=1
                    total_+=1
                    if total < 0:
                        total = 0
                    else:
                        total+=1
                    # print('Alguém entrou na área de risco')
                    print('Alguém entrou na área de risco')
                    # muda cor da linha para mostrar que uma pessoa passou
                    cv2.line(frame,xy1,xy2,(0,0,0),2)
                    continue

                # detecta as pessoas que desceram
                if detect[c-1][1] > posL and l[1] < posL:
                    linha = 2
                    detect.clear()
                    down+=1
                    total_+=1
                    if total < 0:
                        total = 0
                    else:
                        total-=1
                    # linha = 1
                    # muda cor da linha para mostrar que uma pessoa passou
                    print('Alguém saiu da área de risco')
                    cv2.line(frame,xy1,xy2,(0,0,0),5)
                    continue

                # else:
                #     # print(linha)
                if detect[c-1][1] < posL_ and l[1] > posL_ :
                    linha = 1
                    detect.clear()
                    down+=1
                    total_+=1
                    if total < 0:
                        total = 0
                    else:
                        total-=1
                    # print('Alguém entrou na área de risco')
                    print('Alguém saiu na área de risco')
                    # muda cor da linha para mostrar que uma pessoa passou
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
                    # muda cor da linha para mostrar que uma pessoa passou
                    print('Alguém entrou da área de risco')
                    cv2.line(frame,xy1_,xy2_,(0,0,0),2)
                    continue

                # detecta as pessoas que desceram
                # if detect[c-1][1] > posL and l[1] < posL:
                #     detect.clear()
                #     down+=1
                #     total-=1
                #     # muda cor da linha para mostrar que uma pessoa passou
                #     print('Alguém saiu da área de risco')
                #     cv2.line(frame,xy1,xy2,(0,0,255),5)
                #     continue

                if c > 0:
                    cv2.line(frame,detect[c-1],l,(0,0,255),1)

    cv2.putText(frame, "TOTAL DE PESSOAS NA AREA: "+str(total), (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255),2)
    cv2.putText(frame, "ENTRADAS: "+str(up), (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0),2)
    cv2.putText(frame, "SAIDAS: "+str(down), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255),2)
    # cv2.putText(frame, "TOTAL: "+str(down), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255),2)

    cv2.imshow("frame", frame)

    # fps do vídeo 
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()