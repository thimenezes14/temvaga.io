TEMVAGA.IO

Este projeto foi concebido como trabalho final do curso de Engenharia de Software para IoT.

O diretório contém toda a documentação e manual técnico do projeto.

O TemVaga.io é um projeto experimental de gerenciamento de vagas de estacionamento.

Principais tecnologias/ferramentas: ReactJS, ElectronJS, Arduino

OBS.: se for utilizar/editar o programa na Raspberry Pi, você deve reinstalar a lib serialport.

Para isso, desinstale a biblioteca serialport e reinstale-a com os comandos abaixo:

npm uninstall serialport
sudo npm install serialport --unsafe-perm --build-from-source

https://serialport.io/docs/guide-installation/#sudo--root

Para compilar o Serialport no Electron, siga as instruções em: https://serialport.io/docs/guide-installation#electron