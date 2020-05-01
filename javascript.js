
const url = window.location.host == "" ? "http://localhost:9525" : "https://www.fornt.es";

function loadArticle(article) {
    $.get(url+"/getArticle/"+article.href, function (data) {
        $("#main").html(data);
    });

    $("#title").html(article.title);
    $("#date").html(article.date);
    $("#name").html(article.user.name);
    $("#web").click(() => { location.href = "https://" + article.user.web });
    $("#web").html(article.user.web);
    $("#photo").css("background-image", 'url("' + article.user.photo + '")');
    $("#lin").click(() => { location.href = "https://www.linkedin.com/in/" + article.user.lin });
    $("#imageArticle").attr("src", article.imageArticle);
    $("#datosArticulo").css("display", "block");
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

let articles = [];
$.get(url+"/getArticles", function (data) {
    articles = data;
    init();
});

function loadArticles() {
    window.history.pushState("", "", window.location.href.split("?")[0]);
    $("#datosArticulo").css("display", "none");
    $("#main").empty();
    articles.forEach(article => {
        const node = $("#card").clone()
        node.find("#cardTitle").html(article.title);
        node.find("#cardImg").attr("src", article.imageArticle);
        node.find("#cardDate").html(article.date);
        node.find("#cardDescription").html(article.description);
        node.find("#cardPhoto").css("background-image", "url('" + article.user.photo + "')");
        node.find("#cardName").html(article.user.name);
        node.click(() => {
            loadArticle(article);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            const url = window.location.href.split("?")[0];
            window.history.pushState("", "", url + "?" + article.href);
        });
        node.css("display", "block");
        $("#main").append(node);
    });
}