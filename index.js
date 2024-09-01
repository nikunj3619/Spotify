
async function getSongs() {
    let main = await fetch("http://127.0.0.1:5500/songs/")
    let response = await main.text()
    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response

    let as = div.getElementsByTagName("a")
    // console.log(as)

    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i]
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1].replaceAll("%20", " "));
        }
    }

    return songs;
}


let currentSong = new Audio();


function playpause() {
    if (currentSong.paused == false) {
        currentSong.pause();
        play.src = "play.svg"
    }
    else {
        currentSong.play();
        play.src = "pause.svg"
    }
}

function playmusic(track) {
    currentSong.src = track;
    currentSong.play();
    play.src = "pause.svg"
}

async function main() {
    const nsongs = await getSongs()
    console.log(nsongs)

    let items = "";
    for (let i = 0; i < nsongs.length; i++) {
        items = (items + `<li>${nsongs[i]}</li>`)
    }


    let final_items = items.split("/songs/")

    let lists = document.querySelector(".lib-songs").innerHTML = final_items;



    Array.from(document.querySelector(".lib-songs").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", () => {
            console.log(element.innerHTML);
            playmusic(/songs/ + element.innerHTML);
            let holder = document.querySelector(".song-info")
            holder.textContent = element.innerHTML.split(".")[0]

        })

    });


    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration)

        {
            // let units_place = (currentSong.duration/60).toFixed(2).split(".")[1];
            // let tens_place = Math.floor(value);

            let value = (currentSong.duration / 60);
            let tens_place = Math.floor(value/60);
            let units_place = (value.toString().split(".")[1]) * 60;

            let no = 0;
            if (units_place >= 60) {
                tens_place = tens_place + 1;
                units_place = units_place - 60;

                if (('' + units_place).length == 1) {
                    document.querySelector(".post").innerHTML = ` 0${tens_place} : 0${units_place}`
                }
                else {
                    document.querySelector(".post").innerHTML = ` 0${tens_place} : ${units_place}`
                }
            }
            else {
                document.querySelector(".post").innerHTML = ` 0${tens_place} : ${units_place}`
            }
        }

        {


            let units_place = (currentSong.currentTime).toFixed(0);
            let tens_place = 0;

            if (units_place >= 60) {
                tens_place = tens_place + 1;
                units_place = units_place - 60;

                if (('' + units_place).length == 1) {
                    document.querySelector(".pre").innerHTML = ` 0${tens_place} : 0${units_place}`
                }
                else {
                    document.querySelector(".pre").innerHTML = ` 0${tens_place} : ${units_place}`
                }
            }
            else {
                document.querySelector(".pre").innerHTML = ` 0${tens_place} : ${units_place}`
            }



        }


    })



}
main()





