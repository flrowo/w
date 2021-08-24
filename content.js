class Content {
    constructor(title, text, date, type, id){
        this.id = id;
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
        this.id = id;
    }
} 

let text = null;
let content = [];
let allright = false;

/* ajax vanilla

fetch(new Request('https://parallelum.com.br/fipe/api/v1/carros/marcas', {method: 'GET'}))
.then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Ops! Houve um erro em nosso servidor.');
    }
})
.then(response => { console.log(response); })
.catch(error => { console.error(error); });
*/

let lastCLicked;

function createContent(type = "all"){
    if(type == lastCLicked) {
        type = "all";
        document.getElementById(lastCLicked).style.color = "";
        lastCLicked = undefined;
    }
    
    if (type != "all") {
        document.getElementById(type).style.color = "#F00";
        if (lastCLicked) document.getElementById(lastCLicked).style.color = "";
        lastCLicked = type;
    }

    console.log("type: "+type);

    text = contentText;


    content = text.split("TITLE>");
    //filtered is the content with only the items that have "p>", "DATE>" and "TITLE>"
    let filtered = content.filter(function(el){
        return (el != "" && el != null && (el.includes("p>") && el.includes("DATE>") && el.includes("TYPE>")));
    });
    
    let actContent = [];
    
    (() => {
        let i = filtered.length-1;
        while(i >= 0){
            let title = filtered[i].split("\n")[0].trim();
            let text = filtered[i].split("p>")[1].split(/DATE>|TYPE>/)[0].trim().replace(/\n/g,"<br>");
            let date = filtered[i].split("DATE>")[1].split("\n")[0].trim();
            let type = filtered[i].split("TYPE>")[1].split("\n")[0].toLowerCase().trim();
            actContent.push(new Content(title, text, date, type, i));
            i--;
        }
    })();
    
    (() => {
        let i = actContent.length-1;
        let htmlstring = "";
        let allContent = false;
        if(type == "all"){
            allContent = true;
        }
        while(i >= 0){
            if(allContent || actContent[i].type.includes(type)){
                htmlstring += `<div class="content-item">
                <h1>${actContent[i].title}</h1><br>
                ${actContent[i].type} - ${actContent[i].date}
                <hr>
                ${actContent[i].text}
                <br><br>
                </div>`;
            }
            i--;
        }
        if(htmlstring.length == 0){
            let icontent = new Content("There is no content about ", "coming soon...", "00/00/0000", type);
            htmlstring += `<div class="content-item">
            <h1>${icontent.title+icontent.type}</h1><br>
            ${icontent.type} - ${icontent.date}
            <hr>
            ${icontent.text}
            <br><br>
            </div>`;
        }
        document.getElementById("content").innerHTML = htmlstring.trim();

    })();

    window.history.pushState("object or string", "Title", "/new-url");

}

createContent();

var backToTopButton = document.getElementById("backToTop");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
