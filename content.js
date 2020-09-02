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
        text = `

        TITLE> I made an osu!Taiko Hack - hackdetaco
p> There is more info at <a href="https://github.com/calmylake/hackdetaco">github.com/calmylake/hackdetaco</a>.
I did it just today, I feel proud of finally doing something from start to finish. 
But also... I just wanna go sleep...

<img src="https://media.tenor.com/images/61dcf7e4d65440b06c8c901ace9924a6/tenor.gif">
DATE> 31/08/2020

TYPE> tools

TITLE> UM TÍTULO MUUU U UU U UU UUUUUU ITO GRANDE
p> aaaaa 
hoje eu fiz um site
construi do zero muleke

blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 
<img style="margin: 30px;" src="https://a.ppy.sh/4689256_1596477920.gif">
blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 
aaaaaaaaaa
DATE> 28/08/2020

TYPE> jooj


TITLE> UM TÍTULO
p> blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 
blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 
blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 

blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 

blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 

blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 
blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 
blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 
blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah 

TYPE> jooj
DATE> 27/08/2020

`;
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
        } else{
            htmlstring += `<button onclick="updateContent();">back</button>`;
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
