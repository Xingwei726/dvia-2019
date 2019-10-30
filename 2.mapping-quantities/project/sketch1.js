var atmospheric;
var underground;
var mortality
var milestone;
var totals;



function preload() {
    totals = loadTable('data/totals.csv', 'csv', 'header')
    atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
    underground = loadTable('data/underground.csv', 'csv', 'header')
    milestone = loadTable('data/milestone.csv', 'csv', 'header')

}


let num = 5
function setup() {
    createCanvas(4200, 900)
    background(196, 196, 196)
    // background(255);
    ellipseMode(CENTER);

    // Put everything in setup instead of seperate between setup and draw
    // }
    // function draw() {

    var table = atmospheric;
    var table2 = underground;
    var table3 = totals;
    var table4 = milestone;
    print(table);
    print(table2);
    print(table3);
    print(table4);

    // Color Palette
    var palUS = Brewer.sequential('RdPu', 6, 0, 60);
    var palRU = Brewer.sequential('PuBu', 6, 0, 60);
    var palUK = Brewer.sequential('BuGn', 6, 0, 60);




    // stave
    stroke(0);//stroke color
    x1 = 100;
    y1 = 150;
    x2 = 3850;
    y2 = 150;
    d = 25;//distance between each line
    d2 = 200;//distance between first line and next first line of the stave
    d3 = 100;//distance between each stave
    for (let i = 0; i < num; i++) {
        line(x1, y1 + d * i, x2, y2 + d * i);
        line(x1, y1 + d * i + d2, x2, y2 + d * i + d2);
        line(x1, y1 + d * i + d2 * 2, x2, y2 + d * i + d2 * 2);
        // line(x1, y1 + d * i + d2 * 3, x2, y2 + d * i + d2 * 3);
        // line(x1, y1 + d * i + d2 * 4, x2, y2 + d * i + d2 * 4);
        // line(x1, y1 + d * i + d2 * 5, x2, y2 + d * i + d2 * 5);
        // line(x1, y1 + d * i + d2 * 6, x2, y2 + d * i + d2 * 6);
        // line(x1, y1 + d * i + d2 * 7, x2, y2 + d * i + d2 * 7);
    }

    // stave vertical lines
    stroke(0);
    push();
    fill(0);
    rect(x1, y1, 5, d * 12 + d3 * 2)//very left bar
    line(x1 + 15, y1, x1 + 15, y1 + d * 12 + d3 * 2) //left vertical line
    line(x2, y1, x2, y1 + d * 12 + d3 * 2)// right vertical line
    pop();


    // Title & Legend Explainations
    textFont("Helvetica")
    textSize(30);
    noStroke();
    textStyle(BOLD);
    text('< Symphony >', x1 - 20, y1 - 90);
    // textStyle(ITALIC);
    // textSize(16);
    // text('from The Nuclear Tests', x1+200, y1-80);
    fill(0);
    ellipse( x1, y1-50, 13, 8);
    ellipse( x1+150, y1-65, 13, 8);
    push();
    stroke(0);
    strokeWeight(2);
    line( x1+6,y1-70, x1+6, y1-50)
    line( x1+156,y1-65, x1+156, y1-45)
    pop();
    push();
    stroke(0);
    strokeWeight(2);
    line(200 + 50 * 4, 0 + y1-60, 5 + 200 + 50 * 4, 10 + y1-60);
    line(200 - 5 + 50 * 4, 10 + y1-60, 200 + 50 * 4, 0 + y1-60);
    pop();



    // y-axis labels
    textFont("Helvetica")
    textSize(16);
    noStroke();
    textStyle(BOLD);

    textFont("Helvetica")
    textSize(12);
    fill(0);
    noStroke();
    ts = 5;//text size bleed
    text('Number of Nuclear Tests Above the Ground', x1 - 20, y1 - 15);
    text('Number of Nuclear Tests Underground', x1 - 20, y1 - 15+d2);
    text('Atmospheric', x1+15, y1-50);
    text('Underground', x1+165, y1-50);
    text('Milestone Explosions', x1+310, y1-50);
    // pop();
    for (let i = 0; i < 3; i++) {
        text('60', x1 - 20, y1 + ts + d2 * i);
        text('45', x1 - 20, y1 + ts + d + d2 * i);
        text('30', x1 - 20, y1 + ts + d * 2 + d2 * i);
        text('15', x1 - 20, y1 + ts + d * 3 + d2 * i);
        text('0', x1 - 15, y1 + ts + d * 4 + d2 * i);
    }


    //x-axis labels & Vertical Reference Line
    textSize(12);
    fill(0);
    noStroke();
    x = 150;
    y = 100;
    xs = 38;
    var rowHeight = 55;
    var colWidth = 50;
    textStyle(NORMAL);
    textAlign(BOLD);

    for (var r = 0; r < table.getRowCount(); r++) {
        var year = table.getString(r, 0);
        text(year, x + xs, y1 + d * 5);//+30 to put in middle
        text(year, x+xs, y1+d*5+(d*4+d3)*1);
        text(year, x + xs, y1 + d * 5 + (d * 4 + d3) * 2);


        // line (x+50, y1, x+50,d*36+d3*7); //one line approach
        for (let i = 0; i < 3; i++) {
            push();
            stroke(172, 172, 172);
            drawingContext.setLineDash([1, 3]);
            line(x + 50, y1 + d2 * i, x + 50, y1 + d * 4 + d2 * i);
            pop();
        }
        x += colWidth
    }


    // //legend
    // fill(0);
    // textFont("Helvetica")
    // textSize(14);
    // noStroke();
    // textStyle(BOLD);
    // textAlign(BOLD);
    // text('USA', x1 + 17, y1 + 15);
    // text('Russia', x1 + 17, y1 - 8 + d2);
    // text('United Kingdom', x1 + 17, y1 - 8 + d2 * 2);
    // text('France', x1 + 17, y1 - 8 + d2 * 3);
    // text('China', x1 + 17, y1 - 8 + d2 * 4);
    // text('India', x1 + 17, y1 - 8 + d2 * 5);
    // text('Pakistan', x1 + 17, y1 - 8 + d2 * 6);
    // text('North Korea', x1 + 17, y1 - 8 + d2 * 7);
    
    textSize(12);
    let s1 = '[1] 1945-07-16 Trinity: First fission device test, first plutonium implosion detonation';
    let s2 = '[2] 1945-08-06 Little Boy: First detonation of a uranium gun-type device, first use of a nuclear device in combat.';
    let s3 = '[3] 1945-08-09 Fat Man: Second and last use of a nuclear device in combat.';
    let s4 = '[4] 1949-08-29 RDS-1: First fission weapon test by the USSR';
    let s5 = '[5] 1952-10-03 Hurricane: First fission weapon test by the UK';
    
    text(s1, x2+50, y2, 200, 800); 
    text(s2, x2+50, y2+55, 200, 800);
    text(s3, x2+50, y2+55*2+10, 200, 800); 
    text(s4, x2+50, y2+55*3+10, 200, 800); 
    text(s5, x2+50, y2+55*4+10, 200, 800); 




    //Mapping data
    lw = 2;

    //1.US Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 1);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }


    //2.Russia Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 2);
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }
    
    //3.UK Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 3);
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }
    
    //4.France Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 4);
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }
    
    //5.China Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 5);
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }

    //6.India Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 6);
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }

    //7.Pakistan Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 7);
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }

    //8.NK Atmospheric  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table.getRowCount(); r++) {
        var value = table.getNum(r, 8);
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palUS.colorForValue(value));
        ellipse(x, 450 - value2, 13, 8);
        push();
        stroke(palUS.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2, x + 6, 428 - value2)
        pop();
        x += colWidth2
    }

    //1.US Underground  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 1);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }
    
    //2.Russia Underground  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 2);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }
    
    //3.  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 3);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }
    
    //4.  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 4);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }
    
    //5.  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 5);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }
    
    //6.  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 6);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }
    
    //7.  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 7);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }
    
    //8.  
    x = 200;
    x1 = 100;
    var colWidth2 = 50;
    for (var r = 0; r < table2.getRowCount(); r++) {
        var value = table2.getNum(r, 8);//1
        var value2 = map(value, 0, 60, y2 + d * 2, 300)
        fill(palRU.colorForValue(value));
        ellipse(x, 450 - value2+d2, 13, 8);
        push();
        stroke(palRU.colorForValue(value));
        strokeWeight(lw);
        line(x + 6, 451 - value2+d2, x + 6, 472 - value2+d2)
        pop();
        x += colWidth2
    }




}

