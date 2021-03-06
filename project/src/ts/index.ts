
const url = window.location.host == "" ? "http://localhost:9525" : "https://www.fornt.es";

function loadArticle(article) {
    $.get(url + "/getArticle/" + article.href, function (data) {
        $("#main").empty();
        
        const div = document.createElement("div");
        div.innerHTML = data;
        div.id = "mainArticulo";
        $("#main").append(div);

        $("input").click(function () {
            $(this).select();
        });

        convertCode();

    });

    $("#title").html(article.title);
    $("#date").html(article.date);
    $("#imageArticle").attr("src", article.imageArticle);
    $("#datosArticulo").css("display", "block");
}


const me = {
    "id": 0,
    "name": "Oscar Fornt",
    "web": "www.fornt.es",
    "photo": "https://www.fornt.es/me/me.png",
    "lin": "fornt/"
};

loadMe();

function closeMe() {
    if ($("#cardMe").css("display") == "table") {
        $("#cardMe").css("display", "none");
        $("#close").find("#min").css("display", "none");
        $("#close").find("#max").css("display", "block");

    } else {
        $("#cardMe").css("display", "table");
        $("#close").find("#min").css("display", "block");
        $("#close").find("#max").css("display", "none");
    }
}

function init() {
    const articleTitle = window.location.href.split("?")[1];
    if (articleTitle != null) {
        const article = articles.find(article => article.href == articleTitle);
        loadArticle(article);
        return;
    }
    loadArticles();
}

function loadMe() {
    $("#me").find("#name").html(me.name);
    $("#me").find("#web").click(() => { location.href = "https://" + me.web });
    $("#me").find("#web").html(me.web);
    $("#me").find("#photo").css("background-image", 'url("' + me.photo + '")');
    $("#me").find("#lin").click(() => { location.href = "https://www.linkedin.com/in/" + me.lin });
    $("#me").css("display", "inline-block");
}

let articles = [];
$.get(url + "/getArticles", function (data) {
    articles = data;
    init();
});

$("#header").click(()=>{
    location.href = "/";
});

window["loadPage"] = function(){
    loadArticles();
}

function loadArticles() {
    window.scrollTo(0, 0);
    window.history.pushState("", "", window.location.href.split("?")[0]);
    $("#datosArticulo").css("display", "none");
    $("#main").empty();
    const list = $(document.createElement("div"));
    list.css("text-align", "center");
    $("#main").append(list);

    articles.forEach(article => {
        const node = $("#card").clone()
        node.find("#cardTitle").html(article.title);
        
        //const colors = ["red", "green", "blue", "yellow"];
        //node.addClass(colors[Math.floor(Math.random() * colors.length)]);

        article.tags.forEach(tag => {
            const nodeTag = $(document.createElement("span"));
            nodeTag.html(tag);
            nodeTag.addClass("tag");
            node.find("#cardTags").append(nodeTag);
        })

        node.find("#cardImg").attr("src", article.imageArticle);
        node.find("#cardDate").html(article.date);
        node.find("#cardDescription").html(article.description);
        node.click(() => {
            loadArticle(article);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            const url = window.location.href.split("?")[0];
            window.history.pushState("", "", url + "?" + article.href);
        });
        node.css("display", "inline-block");
        list.append(node);
    });
}


//Crisp
//@ts-ignore
window.$crisp = []; window.CRISP_WEBSITE_ID = "34b28ae3-7f7a-4a28-a8e0-f1a1431ff0f0"; (function () { d = document; s = d.createElement("script"); s.src = "https://client.crisp.chat/l.js"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();



const hljs = require('highlight.js/lib/core');
const javascript = require('highlight.js/lib/languages/javascript');
hljs.registerLanguage('javascript', javascript);


function convertCode() {
    $(".code").each(function () {
        const elem = $(this);
        let code = elem.val() != "" ? elem.val()+"" : elem.html()+"";
        code = code.replace("&gt;", ">");
        const highlightedCode = hljs.highlight('javascript', code).value;
        elem.html(highlightedCode);
    });
}