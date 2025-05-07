@echo off
:: Define o JAVA_HOME (muda aqui se o caminho for diferente)
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.10+7
set PATH=%JAVA_HOME%\bin;%PATH%

:: Vai para a pasta do projeto
cd C:\Users\felip\Documents\Projeto E-health

:: Inicia o Metro Bundler do Expo
npx expo start

:: Mantém a janela aberta para ver mensagens
pause
