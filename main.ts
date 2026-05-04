const enum gameState {
    Passive,
    Started,
    Running
};

let state: gameState = gameState.Passive;

function drawHourglass(): void {
    basic.clearScreen()
    led.plot(0, 0) //Čára nahoře 
    led.plot(1, 0) //Čára nahoře
    led.plot(2, 0) //Čára nahoře
    led.plot(3, 0) //Čára nahoře
    led.plot(4, 0) //Čára nahoře
    led.plot(1, 1) //X uprostřed
    led.plot(3, 1) //X uprostřed
    led.plot(2, 2) //X uprostřed
    led.plot(1, 3) //X uprostřed
    led.plot(3, 3) //X uprostřed
    led.plot(0, 4) //Čára dole
    led.plot(1, 4) //Čára dole
    led.plot(2, 4) //Čára dole
    led.plot(3, 4) //Čára dole
    led.plot(4, 4) //Čára dole
}

input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (state === gameState.Passive) {
        state = gameState.Started;

        drawHourglass();
        control.runInBackground(() => music.playTone(262, 300));

        basic.pause(randint(3, 6) * 1000);

        const pressedA: boolean = input.buttonIsPressed(Button.A);
        const pressedB: boolean = input.buttonIsPressed(Button.B);

        if (pressedA && pressedB) {
            basic.showIcon(IconNames.Sad);
            control.runInBackground(() => music.playTone(150, 500));
            basic.pause(1500);
            basic.clearScreen();
            state = gameState.Passive;

        } else if (pressedA) {
            basic.showString("B");
            control.runInBackground(() => music.playTone(523, 400));
            basic.pause(1500);
            basic.clearScreen();
            state = gameState.Passive;

        } else if (pressedB) {
            basic.showString("A");
            control.runInBackground(() => music.playTone(523, 400));
            basic.pause(1500);
            basic.clearScreen();
            state = gameState.Passive;

        } else {
            state = gameState.Running;
            basic.showIcon(IconNames.Pitchfork);
        }

        if (state === gameState.Running) {
            let winner: boolean = false;

            while (!winner) {
                const pressedA = input.buttonIsPressed(Button.A);
                const pressedB = input.buttonIsPressed(Button.B);

                if (pressedA && pressedB) {
                    basic.showIcon(IconNames.Square);
                    control.runInBackground(() => music.playTone(440, 400));
                    winner = true;
                } else if (pressedA) {
                    basic.showString("A");
                    control.runInBackground(() => music.playTone(523, 400));
                    winner = true;
                } else if (pressedB) {
                    basic.showString("B");
                    control.runInBackground(() => music.playTone(523, 400));
                    winner = true;
                } else {
                    basic.pause(50);
                }
            }
            basic.pause(1500);
            basic.clearScreen();
            state = gameState.Passive;
            
        }
    }
})