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

TITLE> finishing the day with some crazy jazz
p> today i worked some hours on this site, did the taiko progress section and a bunch of other stuff

<img src="https://i1.sndcdn.com/artworks-000268104230-lt2i6d-t500x500.jpg">
<a href="https://soundcloud.com/bionicelcor/sleep-walker-eclipse">best song of the day</a>
<a href="https://soundcloud.com/reisenudongeininaba/sets/def-just-hearing-is-already">playlist 1</a>
<a href="https://soundcloud.com/reisenudongeininaba/sets/def-favoritas">playlist 2</a>

i played LoL again after one week? i think?
and i did some work today and yesterday on the college thingy, i'll search how to say it...
but... what i've found doesn't apply to what i'm doing with my team. we're doing an academic project for graduation in tecnology... it isn't a monograph or something like that...
i'll not mess my head up with this thing at 3 AM

edit: and i actually edited the css... so images aren't that large (like 1000px)

DATE> 02/09/2020
TYPE> blog


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

TYPE> testing

TITLE> primeira play de 100pp
p> 
<img src="https://cdn.discordapp.com/attachments/742944663996203120/745702723055517767/unknown.png">
primeira play de 100pp
2.8*
1 miss
99.36% acc

TYPE> taiko progress
DATE> 19/08/2020



TITLE> pegando o básico [PT-BR]
p> 
<img src="https://cdn.discordapp.com/attachments/742944663996203120/742944950001467492/unknown.png">
<img src="https://cdn.discordapp.com/attachments/742944663996203120/742946191016198234/unknown.png">
<img src="https://cdn.discordapp.com/attachments/742944663996203120/743142929715167292/unknown.png">
^ esse pass de 3.28*
foi meio mal jogado, mas ainda sim é algo que eu não fazia antes
<a href="https://osu.ppy.sh/beatmapsets/1044372">https://osu.ppy.sh/beatmapsets/1044372</a>
<img src="https://cdn.discordapp.com/attachments/742944663996203120/743143371522048061/unknown.png">
e esse quase fc em uma de 2.97*
<img src="https://cdn.discordapp.com/attachments/742944663996203120/743146031444787240/unknown.png">
esse pass tmbm

TYPE> taiko progress
DATE> 11/08/2020

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
