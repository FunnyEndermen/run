var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var gameTime = 0; //Переменная для отслеживания длины игры

//Игрок
var player = { x:160, y:340, height: 80, width: 50, xSpeed:0, ySpeed:0 };

//Созданию функцию для блока
function Block(x, y, width, height, xSpeed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
}

//Его функция отрисовки
function drawBlock(block){
    pic = new Image();
    pic.src = "10_кактус.png";
    context.drawImage(pic, block.x, block.y, block.width, block.height)
    //context.fillStyle = "black";
    //context.fillRect(block.x, block.y, block.width, block.height)
}
//Создание врага
var enemy = new Block(canvas.width, canvas.height-150, 50, 100, -3)

//Создание платформы
function Platform(x,y,width, height, xSpeed){
    this.x = x;
    this.y = y;    
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
}

    function drawPlatform(block){
        img = new Image();
        img.src = "4_20.png";
        context.drawImage(img, block.x, block.y, block.width, block.height)
    }

    var platform1 = new Platform(0, canvas.height-50, canvas.width, 50, -3)
    var platform2 = new Platform(canvas.width, canvas.height-50, canvas.width, 50, -3)
    function updateGame(){  
        //Алгоритм движения персонажа
        player.x += player.xSpeed;
        player.y += player.ySpeed;

        //Персонаж не уходит за платформой
        if (player.y >= canvas.height - player.height - 50){
            player.ySpeed = 0
            player.xSpeed = 0
        }

        //Движение врага
        enemy.x += enemy.xSpeed

        //Телепорт врага
        if (enemy.x < 0-enemy.width){
            enemy.x= canvas.width;
            //Новые данные врага
            enemy.width = Math.floor(Math.random() * 100) +50;
            enemy.height = Math.floor(Math.random() * 200) +50;
            enemy.y = canvas.height - 50 -enemy.height
            enemy.xSpeed = (Math.floor(Math.random() * 5 ) + 3) * -1;
        }
        platform1.x += platform1.xSpeed;
        platform2.x += platform2.xSpeed;

        //Телепорты
        if (platform1.x < 0-platform1.width){
            platform1.x = platform2.width -10
        }

        if(platform2.x < 0 -platform2.width){
            platform2.x = platform1.width -10
        }

        gameTime++; //Увеличении времени игры при каждом обновлении игры
    }

    function checkCollision(){
        if ( player.x + player.width > enemy.x && player.x < enemy.x+enemy.width && player.y+player.height > enemy.y && player.y < enemy.y+enemy.height){


            //Запуск модального окна
            modal.style.display = "block";
            document.getElementById("message").innerHTML = "Проигрыш <br/> Пройдено"+gameTime + "пути";
            game.stop();
        }
    }

    var modal = document.getElementById("myModal");

    //Создание функцию которая будет выводить модальное окно пока не закроем его
    window.onclick = function(event){
        if (event.target == modal){
            modal.style.display = "none"
            location.reload();
        }
    }

    function onKeyPress(event){
        const key = event.key.toLowerCase();
        if (key === "a"){
            player.xSpeed = -5;
        }
        if (key === "d"){
            player.xSpeed = 5;
        }

        if (key === " "){
            player.ySpeed = -8;
        }

    }
    window.addEventListener("keydown", onKeyPress);

    function onKeyRelease(event){
        const key = event.key.toLowerCase();
        if(key === "a" || key === "d"){
            player.xSpeed = 0;
        }

        if (key === " "){
            player.ySpeed = 5;
        }

    }
    window.addEventListener("keyup", onKeyRelease);

function draw(){
    //Очистка предыдущих движений
    context.clearRect(0, 0, canvas.width, canvas.height)

    //Отрисовка врага 
    drawBlock(enemy);

    //Отрисовка персонажа
    pic = new Image();
    pic.src = "Игровое поле (1).png";
    context.drawImage(pic, player.x, player.y, player.width, player.height);
    
    //Отрисовка платформы
    //context.fillStyle = "orange1"
    //context.fillRect(0, canvas.height -50, canvas.width, 50)


    //Отрисовка врага 
    drawBlock(enemy);

    drawPlatform(platform1);
    drawPlatform(platform2);

    //отрисовка времени игры
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Пройдено:" + gameTime, 10, 30);
}

function tick(){
    // Вызов функции движения
    checkCollision();

    //вызов функции движения
    updateGame();

    //Вызов функции отрисовки
    draw();
   game = window.setTimeout("tick()", 1000/60);
}
tick();