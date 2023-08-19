export default class Timer {
    constructor(root){
        console.log(root);
        root.innerHTML = Timer.getHTML();
        
        this.el = {
            hour: document.querySelector('.tphr'),
            min: document.querySelector('.tpmin'),
            sec: document.querySelector('.tpsec'),
            start: document.querySelector('.btnstart'),
            reset: document.querySelector('.btnreset')
        };

        this.interval = null;
        this.remainingSec = 3603;

        this.doStart();
       
        this.el.start.addEventListener("click", () => {
            if (this.interval === null) {
                this.doStart();
                this.el.start.innerHTML = `<span><i class="fa-solid fa-pause fa-lg" style="color: #000000;"></i></span>`;
            } else {
                this.stop();
                this.el.start.innerHTML = `<span><i class="fa-solid fa-play fa-lg" style="color: #000000;"></i></span>`;
            }
        });
        
        this.el.reset.addEventListener("click", ()=>{
            const inputHours = prompt("Enter the number of hours");
            const inputMin = prompt("Enter number of minutes");

            if(inputMin < 60){
                this.stop();
                this.remainingSec = inputHours * 3600 + inputMin * 60;
                this.updateInterface();
            }
            }
        )
    }

    updateInterface(){
        const hours = Math.floor(this.remainingSec/3600);
        const minutes = Math.floor((this.remainingSec%3600)/60);
        const seconds = this.remainingSec % 60;

        this.el.hour.textContent = hours.toString().padStart(2,"0");;
        this.el.min.textContent = minutes.toString().padStart(2,"0");
        this.el.sec.textContent = seconds.toString().padStart(2,"0");
    }

    updateButton(){
        if(this.interval !== null){
            this.el.start.innerHTML = `<span><i class="fa-solid fa-play fa-lg" style="color: #000000;"></i></span>`
            this.el.start.classList.add("btnstart");
            this.el.start.classList.remove("btnreset");
        }
        else{
            this.el.start.innerHTML = `<span><i class="fa-solid fa-pause fa-lg" style="color: #000000;"></i></span>`
            this.el.start.classList.add("btnreset");
            this.el.start.classList.remove("btnstart");
        }

    }

    doStart(){
        if(this.remainingSec === 0) return;
    
        if (this.interval === null) {
            this.interval = setInterval(() => {
                this.remainingSec--;
                this.updateInterface();
    
                if(this.remainingSec === 0){
                    this.stop();
                    this.showTimeUpPrompt(); // Call the function to show a prompt
                }
            }, 1000);
    
            this.el.start.innerHTML = `<span><i class="fa-solid fa-pause fa-lg" style="color: #000000;"></i></span>`;
        } else {
            this.stop();
            this.el.start.innerHTML = `<span><i class="fa-solid fa-play fa-lg" style="color: #000000;"></i></span>`;
        }
    }
    
    showTimeUpPrompt() {
        alert("Time is up!"); // You can use alert or prompt to display a message
    }
    


        stop(){
            clearInterval(this.interval);
            this.interval = null;
            this.el.start.innerHTML = `<span><i class="fa-solid fa-play fa-lg" style="color: #000000;"></i></span>`;
        }
        
    static getHTML(){
     return ` <span class="timerpart tphr">00</span>
        <span class="timerpart">:</span>
        <span class="timerpart tpmin">00</span>
        <span class="timerpart">:</span>
        <span class="timerpart tpsec">00</span>
        <button type="button" class="timerbtn btnstart">
            <span><i class="fa-solid fa-play fa-lg" style="color: #000000;"></i></span>
        </button>
        <button type="button" class="timerbtn btnreset">
            <span><i class="fa-solid fa-clock-rotate-left fa-lg" style="color: #000000;"></i></i></span>
        </button> `;
    }
}
