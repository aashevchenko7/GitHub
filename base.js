var express = require('express');
var router = express.Router();

var fs = require("fs");
var multiparty = require('multiparty');

router.post('/getmessages', function(req, res) {

	

	

	res.send(answer);


});



/*
APPID: 4457
APPSGN: 80356b911c3ea5336f84f8b531b4f0b1

API documentation can be found at http://studyx.co/ru/api/start/.



 * 01. Процесс тестирования.
 * 
Общая схема реализации тестирования построена таким образом, что генерация тестового задания, его проверка и формирование результатов теста проходят на стороне сервера. Мобильное приложение выступает в роли "тонкого клиента", осуществляющего только отображение процесса тестирования, сбор ответов, их отправку на сервер для проверки и отображение итоговых результатов.
Схема организации тестирования выглядит следующим образом:
Приложение посылает запрос на сервер
В качестве ответа от сервера приложение получает тестовое задание – список вопросов с вариантами ответов (вопросы могут быть трех типов – с радиокнопками, с чекбоксами, с текстовым полем для ввода)
Прохождение теста осуществляется внутри приложения, при получении ответа на очередной вопрос приложение отсылает на сервер запрос на добавление соответствующей записи в протоколе тестирования
При получении последнего ответа или принудительном завершении теста формируется запрос к серверу, отсылающий данные пользователем ответы на сервер и закрывающий тестирование
Внутри приложения осуществляется переход к просмотру результатов тестирования


 * 02. Генерация списка вопросов с вариантами ответов
 * 
 * 
 * Пример запроса
http://dev.moyuniver.ru/api/php/v03/api_runevent.php?eid=15972&memberid=28665485147fa7133b44cb&appid=306&appsgn=d8629af695839ba5481757a519e57fb1&appcode=&os=&ver=&width=&height=
Результатом успешного выполнения запроса по инициализации теста является создание листа тестирования, который содержит полный набор вопросов с вариантами ответов и в который в дальнейшем заносится вся информация о ходе тестирования, включая варианты ответов, выбранные пользователем.
Формат выдачи
TID#QID#QTYPE#QTXT#AID#ATXT#EMPTY#EMPTY#TSID
TID – уникальный идентификатор сессии тестирования
# – разделитель
QID – уникальный идентификатор вопроса
QTYPE – тип вопроса (2 – с выбором одного ответа = радиокнопки, 3 – с текстовым полем, 4 – с выбором нескольких ответов = чекбоксы)
QTXT – текст вопроса
AID – уникальный идентификатор варианта ответа
ATXT – текст варианта ответа
EMPTY – временно не используется
TSID – уникальный идентификатор вопроса в протоколе тестирования


Пример выдачи
24227#145076#2#Вопрос 1#566938#ответ 1###48862
24227#145076#2##566939#ответ 2 ПР###48862
24227#145076#2##566940#ответ 3###48862
24227#145076#2##566941#ответ 4###48862
24227#145077#4#Вопрос 2#566942#ответ 1 ПР###48863
24227#145077#4##566943#ответ 2###48863
24227#145077#4##566944#ответ 3 ПР###48863
24227#145077#4##566945#ответ 4###48863
24227#145078#2#Вопрос 3#566946#ответ 1 ПР###48858
24227#145078#2##566947#ответ 2###48858
24227#145078#2##566948#ответ 3###48858
24227#145078#2##566949#ответ 4###48858
24227#145079#4#Вопрос 4#566950#ответ 1###48860
24227#145079#4##566951#ответ 2 ПР###48860
24227#145079#4##566952#ответ 3###48860
24227#145079#4##566953#ответ 4 ПР###48860
24227#145080#4#Вопрос 5#566954#ответ 1###48859
24227#145080#4##566955#ответ 2 ПР###48859
24227#145080#4##566956#ответ 3 ПР###48859
24227#145080#4##566957#ответ 4###48859
24227#145081#2#Вопрос 6#566958#ответ 1 ПР###48861
24227#145081#2##566959#ответ 2###48861
24227#145081#2##566960#ответ 3###48861
24227#145082#3#Вопрос 7#566986#прав1###48857
24227#145082#3##566987#прав1.###48857


02. Протоколирование ответа на вопрос

http://dev.moyuniver.ru/api/php/v03/api_asheet.php?tid=&tsid=&memberid=&qtype=&qid=
tid – уникальный идентификатор сессии тестирования
tsid – уникальный идентификатор вопроса в протоколе тестирования
memberid – уникальный id пользователя
qtype – тип вопроса
qid – уникальный идентификатор вопроса

Уведомление для протоколирования хода тестирования вызывается после получения ответа на каждый очередной вопрос



03. Протоколирование ответа с проверкой правильности
http://dev.moyuniver.ru/api/php/v03/api_asheet_mod.php?tid=&tsid=&memberid=&qtype=&qid=
tid – уникальный идентификатор сессии тестирования
tsid – уникальный идентификатор вопроса в протоколе тестирования
memberid – уникальный id пользователя
qtype – тип вопроса
qid – уникальный идентификатор вопроса
a – ответ на вопрос
Уведомление для протоколирования хода тестирования вызывается после получения ответа на каждый очередной вопрос
Параметр a формируется на основе внутреннего протокола приложения. Для вопроса типа 2 указывается идентификатор выбранного ответа AID. Для вопроса типа 3 указывается текст ответа в формате wrd:ANSWER. Для вопроса типа 4 указываются все выбранные ответы в формате AID1;AID2;AID3;
Формат выдачи
CORRECT
CORRECT – правильность ответа (0 - неправильно, 1 - правильно)



05. Завершение тестирования.

http://dev.moyuniver.ru/api/php/v03/api_finish.php?tid=&memberid=&a=
tid – уникальный идентификатор сессии тестирования
memberid – уникальный id пользователя
a – ответы, данные на вопросы теста
Параметр a формируется на основе внутреннего протокола приложения и содержит ответы на вопросы в оригинальной последовательности. Ответы разделяются символом “-“. Для вопроса типа 2 указывается идентификатор выбранного ответа AID. Для вопроса типа 3 указывается текст ответа в формате wrd:ANSWER. Для вопроса типа 4 указываются все выбранные ответы в формате AID1;AID2;AID3;
Пример вызова
http://dev.moyuniver.ru/api/php/v03/api_finish.php?tid=24314&memberid=28665485147fa7133b44cb&a=566939-566942;566943;-566947-566951;566952;-566955;566956;-566958-wrd: прав1
 * */


function generateTest(eid, memberid,callback){
/*
* http://dev.moyuniver.ru/api/php/v03/api_runevent.php?eid=&memberid=
* eid – уникальный идентификатор теста
* memberid – уникальный id пользователя
* 
* */	
	var uri = 'http://dev.moyuniver.ru/api/php/v03/api_runevent.php?eid='+eid+'&memberid='+memberid;
	
	sendRequest(uri,function(result){
		callback(result);
	});
}


exports.protocolAnswer = function(){
	
	
}


exports.finishTesting = function(){
	
	
}


function start(){

	//00. Авторизация.
	 authorization(function(result){
		console.log('result: '+JSON.stringify(result)); 
	 });
	
	

	var eid = '';
	var memberid = '';
	
	generateTest(eid,memberid,function(result){
		
		console.log('test: '+JSON.stringify(result));
	});
	

}

/*
 * Авторизация
 * 
Единый логин платформы Мой Универ
На экране авторизации необходимо указать информацию об используемой в платформе Мой Универ единой регистрации, работающей во всех приложениях вселенной Мой Универ (зарегистрировавшись один раз, пользователь может не регистрироваться в других приложениях и использовать для входа регистрационные данные, указанные в первый раз).
Для этого на экране авторизации необходимо разместить запись следующего содержания:
"Вселенная Мой Универ


Логин из других наших приложений работает и здесь!"

http://dev.moyuniver.ru/api/php/v03/api_login.php?login=&pass=&memberid=&phoneid=
login – логин пользователя
pass – пароль пользователя
memberid – уникальный id пользователя
phoneid – уникальный id телефона
Также допускается авторизация без пароля, только по логину и memberid. Данный вид авторизации используется при повторных входах для автоматического логина пользователя.
Тестовая авторизация для разработчика: логин guest, пароль guest.



Пример авторизации
http://dev.moyuniver.ru/api/php/v03/api_login.php?login=guest&pass=guest&memberid=&phoneid=&appid=306&appsgn=d8629af695839ba5481757a519e57fb1&appcode=&os=&ver=&width=&height= (авторизация по логину и паролю)
Формат выдачи
MID#EMAIL#PAIDTILL#UID
MID – уникальный id пользователя
EMAIL – адрес электронной почты (логин)
PAIDTILL – дата окончания платной подписки
UID – уникальный идентификатор пользователя



Пример выдачи
28665485147fa7133b44cb#guest@argusm.com#01-05-2013#245
При невозможности авторизовать пользователя возвращается 0

 * */

function authorization(callback){
	var uri = 'http://dev.moyuniver.ru/api/php/v03/api_login.php?login=guest&pass=guest&memberid=&phoneid=&appid=306&appsgn=d8629af695839ba5481757a519e57fb1&appcode=&os=&ver=&width=&height=';
	sendRequest(uri,callback);
}


//Отладочная функция
function sendRequest(uri,callback){
    request.post(
        {
            url:uri
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                //return console.error('upload failed:', err);
                callback(err, httpResponse, body);
            }
            	
            callback(body);
        });
            
}

router.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

module.exports = router;
		
