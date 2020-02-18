class SoundPlayer {
    
    constructor(enableSounds = true) {
      
      this.enableSounds = enableSounds;
      
      this.sounds = {
        "drone": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F195137__glueisobar__cavernous-drone.ogg?v=1581466929860",
        "click": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F219477__jarredgibb__button-04.ogg?v=1581466969567",
        "click2":"https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F178186__snapper4298__camera-click-nikon.ogg?v=1581471198068",
        "down":  "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F159399__noirenex__power-down.ogg?v=1581467189312",
        "crash": "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F13830__adcbicycle__21.ogg?v=1581470565578"
      };

      this.breakdownSounds = [
        "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F159399__noirenex__power-down.ogg?v=1581467189312",
        "https://cdn.glitch.com/d4633f62-4aca-466e-9f9b-d1871ab95902%2F13830__adcbicycle__21.ogg?v=1581470565578"
      ];
    }

    playSound(soundId, loop = false) {  
      const audio = document.createElement("audio");
      audio.loop = loop;
      audio.src = this.sounds[soundId];
      this.play(audio);
    }

    errorSound() {
      const elementId = this.random(0, this.breakdownSounds.length);
      const audio = document.createElement("audio");
      audio.src = this.breakdownSounds[elementId];
      this.play(audio);
    }

    play(audioElement) {
      if (this.enableSounds) {
        audioElement.play();
      }
    }

    random(start, end) { 
      return Math.floor((Math.random() * end) + start); 
    }    
  }