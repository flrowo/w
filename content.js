class Content {
    constructor(title, text, date, type){
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
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

function createContent(hasText, type){
    console.log("type: "+type);
    if(hasText == false){
        text = contentText;
    }


    content = text.split("TITLE>");
    //filtered is the content with only the items that have "TITLE>", "p>" and "DATE>"
    let filtered = content.filter(function(el){
        return (el != "" && el != null && (el.includes("p>") && el.includes("DATE>") && el.includes("TYPE>")));
    });
    
    let actContent = [];
    
    (() => {
        let i = 0;
        while(i < filtered.length){
            let title = filtered[i].split("\n")[0].trim();
            let text = filtered[i].split("p>")[1].split(/DATE>|TYPE>/)[0].trim().replace(/\n/g,"<br>");
            let date = filtered[i].split("DATE>")[1].split("\n")[0].trim();
            let type = filtered[i].split("TYPE>")[1].split("\n")[0].toLowerCase().trim();
            actContent.push(new Content(title, text, date, type));
            i++;
        }
    })();
    
    (() => {
        let i = 0;
        let htmlstring = "";
        let allContent = false;
        if(type == "all"){
            allContent = true;
        }
        while(i < actContent.length){
            
            if(allContent || actContent[i].type == type){
                htmlstring += `<div class="content-item">
                <h1>${actContent[i].title}</h1><br>
                ${actContent[i].type} - ${actContent[i].date}
                <hr>
                ${actContent[i].text}
                <br><br>
                </div>`;
            }
            i++;
        }
        document.getElementById("content").innerHTML = htmlstring.trim();
    })();

}

function updateContent(contentType = "all"){
    $.ajax({url: "./zsources/blog%20text/root.txt", success: function(result){
        text = result;
        allright = true;
        console.log("contentType: "+contentType);
        createContent(true, contentType);
    }, error: function(){createContent(false, contentType); console.log("couldn't get the online .txt")}
    });
}

updateContent();
