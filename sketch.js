let radius = 200;
let padding = radius - 50;
let offset = 30; //quanto cerchiolini sono vicini al perimetro del cerchio del continente
let pointsDim = 400;

let table;

function preload() {
  table = loadTable('./assets/Rivers in the world - Data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(padding*11 + radius, window.innerHeight); //ho scelto tutti i padding dispari, fino a 11
  background(240);
  noLoop();

  textAlign(CENTER, CENTER);
}

function draw() {
  let continent = table.getColumn('continent');
  let river_length = table.getColumn('length');
  let river_temp = table.getColumn('avg_temp');

  //n --> numero di fiumi in ogni continente
  let n_sudamerica = 0, n_nordamerica = 0, n_europa = 0, n_africa = 0, n_australia = 0, n_asia = 0;
  let l_sudamerica = [], l_nordamerica = [], l_europa = [], l_africa = [], l_australia = [], l_asia = [];
  let t_sudamerica = [], t_nordamerica = [], t_europa = [], t_africa = [], t_australia = [], t_asia = [];

  let strokeW, strokeC;
  //strokeW --> weight cerchiolini; strokeC --> colore cerchiolini

  translate(0, height/2);

  for (i = 0; i < continent.length; i++) {
    if (continent[i] == "South America") {
      n_sudamerica++;
      l_sudamerica.push(river_length[i]); //.push per aggiungere in coda a un array un elemento
      t_sudamerica.push(river_temp[i]);
    }

    if (continent[i] == "North America") {
      n_nordamerica++;
      l_nordamerica.push(river_length[i]);
      t_nordamerica.push(river_temp[i]);
    }

    if (continent[i] == "Europe") {
      n_europa++;
      l_europa.push(river_length[i]);
      t_europa.push(river_temp[i]);
    }

    if (continent[i] == "Africa") {
      n_africa++;
      l_africa.push(river_length[i]);
      t_africa.push(river_temp[i]);
    }

    if (continent[i] == "Australia") {
      n_australia++;
      l_australia.push(river_length[i]);
      t_australia.push(river_temp[i]);
    }

    if (continent[i] == "Asia") {
      n_asia++;
      l_asia.push(river_length[i]);
      t_asia.push(river_temp[i]);
    }
  }

  circle(padding, 0, radius);
  for (i = 0; i < n_sudamerica; i++) {
    strokeW = l_sudamerica[i];
    strokeC = map(t_sudamerica[i], 0, 30, 51, 254);
    generatePoints(padding, 0, radius, strokeW, strokeC);
  }

  circle(padding*3, 0, radius);
  for (i = 0; i < n_nordamerica; i++) {
    strokeW = l_nordamerica[i];
    strokeC = map(t_nordamerica[i], 0, 30, 51, 254);
    generatePoints(padding*3, 0, radius, strokeW, strokeC);
  }

  circle(padding*5, 0, radius);
  for (i = 0; i < n_europa; i++) {
    strokeW = l_europa[i];
    strokeC = map(t_europa[i], 0, 30, 51, 254);
    generatePoints(padding*5, 0, radius, strokeW, strokeC);
  }

  circle(padding*7, 0, radius);
  for (i = 0; i < n_africa; i++) {
    strokeW = l_africa[i];
    strokeC = map(t_africa[i], 0, 30, 51, 254);
    generatePoints(padding*7, 0, radius, strokeW, strokeC);
  }

  circle(padding*9, 0, radius);
  for (i = 0; i < n_australia; i++) {
    strokeW = l_australia[i];
    strokeC = map(t_australia[i], 0, 30, 51, 254);
    generatePoints(padding*9, 0, radius, strokeW, strokeC);
  }

  circle(padding*11, 0, radius);
  for (i = 0; i < n_asia; i++) {
    strokeW = l_asia[i];
    strokeC = map(t_asia[i], 0, 30, 51, 254);
    generatePoints(padding*11, 0, radius, strokeW, strokeC);
  }


  fill(0);
  strokeWeight(0);
  textSize(22);
    text('Sudamerica', padding, padding);
    text('Nordamerica', padding*3, padding);
    text('Europa',padding*5, padding);
    text('Africa', padding*7, padding);
    text('Australia', padding*9, padding);
    text('Asia', padding*11, padding);
}

function generatePoints(xCenter, yCenter, radius, strokeW, strokeC) {
  let xRand, yRand, isInside = false; //Rand --> valore x calcolato casualmente, interno al cerchio del continente
  do {
    xRand = random(xCenter - radius, xCenter + radius)
    yRand = random(yCenter - radius, yCenter + radius)
  
    isInside = collidePointCircle(xRand, yRand, xCenter, yCenter, radius - offset);
  } while (!isInside);

  strokeW /= pointsDim;

  stroke(255, strokeC, 51);
  strokeWeight(strokeW);
  point(xRand, yRand);

  stroke(0);
  strokeWeight(1);
}
