function createddiv(classname){
    var div = document.createElement('div');
    div.className = classname;
    return div;
}
function $(id){
    return document.getElementById(id);
}
//疯狂模式//疯狂模式
function createrow(){
    var con = $('con');
    var row = createddiv('row');
    var arr = mcreatecell();
    con.appendChild(row);

    for(var i = 0; i < 5; i++){
        row.appendChild(createddiv(arr[i])); //添加row的子节点 cell
    }

    if(con.firstChild == null){
        con.appendChild(row);
    }else{
        con.insertBefore(row, con.firstChild);
    }

}
//疯狂模式

function deletedrow(){
    var con = $('con');
    if(con.childNodes.length == 6){
        con.removeChild(con.lastChild);
    }
}
//创建黑块
//疯狂模式
function mcreatecell(){
    var temp = ['mcell','mcell','mcell','mcell'];
    var i = Math.floor(Math.random()*5);
    temp[i]='mcell madnes';
    return temp;
}

//让其动起来
var clock=null;
var state = 0;
var speed = 4;

function move(){
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con,null)['top']); 

    if(speed+ top>0){
        top=0;
    }
    else{
        top+=speed;
    }

    con.style.top= top+'px';

    if(top==0){
        createrow();
        con.style.top= '-110px';
        deletedrow();

    }
    else if(top == (-110 + speed)){
        var rows = con.childNodes;
        if((rows.length == 5) && (rows[rows.length-1].pass !== 1) ){
            fail();
        }
    }
}
function fail(){
    clearInterval(clock);
    confirm('疯狂的你的得分: ' + parseInt($('right').innerHTML) );
}

//加速
function speedup(){
    speed += 4;
    if(speed == 20){
        alert('你超神了');
    }
}




///积分

function score(){
    var newscore  = parseInt($('right').innerHTML) + 1;

    $('right').innerHTML = newscore;
    if(newscore %5 == 0){
        speedup();
    }
}
function judge(events){
    if(events.target.className.indexOf('madnes') != -1){
        events.target.className = 'mcell';
        events.target.parentNode.pass = 1;//定义属性pass，表明此行row的黑块已经被点击
        score();
    }
}
function init(){
    for(var i=0;i<3;i++){
        createrow();
    }

    $('main').onclick = function(events){
        judge(events);
    }

    clock = window.setInterval('move()',30);
}
init();