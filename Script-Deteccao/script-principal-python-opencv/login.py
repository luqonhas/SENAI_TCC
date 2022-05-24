import requests


def Logar(email, senha):
    data = { 'email': email, 'password': senha }

    resposta = requests.post('http://localhost:5000/v1/login/signin', json=data, verify=False)

    if(resposta.status_code != 500):
        return resposta.json()['data']['token']

    return False