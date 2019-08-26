export const paragraph_style_1 = (settings, ctx) => {
    const font_size = settings.font_size;
    const font_color = settings.font_color;
    const pos_x = settings.pos_x;
    const pos_y = settings.pos_y;
    let square_width = settings.square_width;
    let text = settings.text;
    let author = settings.author;
    let font_name = settings.font_name;
    let words = settings.words;
    const height = settings.height;
    const width = settings.width;

    const leading = 0; // Space between letters
    const spacing = 25 * (font_size * 0.05); // Space between lines
    let line_height = pos_y; // Start Position Y
    let line = "";
    let line_width = 0;
    let square_height = 1;
    let next_word_width = "";
    let word_width = 0.0;
    if (typeof square_width === "undefined") {
        square_width = settings.square_width;
    }

    ctx.font = `${font_size}px ${font_name}`;
    ctx.fillStyle = font_color;

    for (let i = 0; i <= words.length; i++) {
        if (typeof words[i] !== "undefined") {
            line = line + words[i] + " ";
            word_width = ctx.measureText(words[i]).width;
            next_word_width = parseFloat(ctx.measureText(words[i + 1]).width);
            line_width = parseFloat(ctx.measureText(line).width);

            if (
                line_width + next_word_width >= square_width ||
                i === words.length - 1
            ) {
                ctx.fillText(line, pos_x, line_height);
                line = "";
                line_width = 0;
                line_height += spacing;
                square_height += spacing;
            }
        }
    }

    ctx.font = `${font_size - 3}px ${font_name}`;
    let author_width = ctx.measureText(author).width;
    ctx.fillText(author, square_width - author_width + pos_x, line_height + 10);

    const text_attributes = {
        square_height: square_height
    };
    /* Debugging for Square Width */
    //◘ctx.rect(pos_x - 10, pos_y - 30, square_width, square_height + 30);
    //ctx.stroke();
    return parseInt(square_height);
}


export const paragraph_style_2 = (settings, ctx) => {
    const font_size = settings.font_size;
    const font_color = settings.font_color;
    const pos_x = settings.pos_x;
    const pos_y = settings.pos_y;
    let square_width = settings.square_width;
    let text = settings.text;
    let author = settings.author;
    let font_name = settings.font_name;
    let words = settings.words;
    const height = settings.height;
    const width = settings.width;

    const leading = 0; // Space between letters
    const spacing = 35 * (font_size * 0.05); // Space between lines
    let line_height = pos_y; // Start Position Y
    let line = "";
    let line_width = 0;
    let square_height = 1;
    let next_word_width = "";
    let word_width = 0.0;
    if (typeof square_width === "undefined") {
        square_width = settings.square_width;
    }

    ctx.font = `${font_size}px ${font_name}`;
    ctx.fillStyle = "black";

    /* Debugging for Square Width */
    for (let i = 0; i <= words.length; i++) {
        if (typeof words[i] !== "undefined") {
            line = line + words[i] + " ";
            word_width = ctx.measureText(words[i]).width;
            next_word_width = parseFloat(ctx.measureText(words[i + 1]).width);
            line_width = parseFloat(ctx.measureText(line).width);
            if (
                line_width + next_word_width >= square_width ||
                i === words.length - 1
            ) {
                ctx.save();
                ctx.beginPath();
                console.log("line_height:" + line_height);
                ctx.rect(pos_x - 10, line_height - spacing + 10 + font_size * 0.4, line_width + 10, font_size * 1.3);
                ctx.fillStyle = "white";
                ctx.fill();

                ctx.globalCompositeOperation = 'source-over';

                ctx.fillStyle = "black";
                ctx.fillText(line, pos_x, line_height);

                ctx.restore();

                line = "";
                line_width = 0;
                line_height += spacing;
                square_height += spacing;

            }
        }
    }

    ctx.font = `${font_size + 15}px ${font_name}`;
    author_width = ctx.measureText(author).width;

    let author_width = ctx.measureText(author).width;

    ctx.save();
    ctx.beginPath();

    ctx.rect(width / 2 - author_width + 65, height - 30 - spacing + font_size * 0.4, author_width + 20, font_size * 1.3 + 20);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
    console.log("Height" + height);
    ctx.fillStyle = "black";
    ctx.fillText(author, width / 2 - author_width + 75, height - 20);

    const text_attributes = {
        square_height: square_height
    };

    return parseInt(square_height);
}

export const paragraph_style_3 = (settings, ctx) => {
    const font_size = settings.font_size;
    const font_color = settings.font_color;
    const pos_x = settings.pos_x;
    const pos_y = settings.pos_y;
    let square_width = settings.square_width;
    let text = settings.text;
    let author = settings.author;
    let font_name = settings.font_name;
    let words = settings.words;
    const height = settings.height;
    const width = settings.width;

    const leading = 0; // Space between letters
    const spacing = 25 * (font_size * 0.05); // Space between lines
    let line_height = pos_y; // Start Position Y
    let line = "";
    let line_width = 0;
    let square_height = 1;
    let next_word_width = "";
    let word_width = 0.0;
    if (typeof square_width === "undefined") {
        square_width = settings.square_width;
    }

    ctx.font = `${font_size}px 'Source Code Pro'`;
    ctx.fillStyle = font_color;

    for (let i = 0; i <= words.length; i++) {
        if (typeof words[i] !== "undefined") {
            line = line + words[i] + " ";
            word_width = ctx.measureText(words[i]).width;
            next_word_width = parseFloat(ctx.measureText(words[i + 1]).width);
            line_width = parseFloat(ctx.measureText(line).width);

            if (
                line_width + next_word_width >= square_width ||
                i === words.length - 1
            ) {
                console.log("Line:" + line);
                console.log("Line Width:" + line_width);
                console.log("Width:" + width / 2);
                console.log(width / 2 - line_width);
                ctx.fillText(line, width / 2 - line_width / 2 + pos_x - 100, line_height);
                line = "";
                line_width = 0;
                line_height += spacing;
                square_height += spacing;
            }
        }
    }

    ctx.font = `${font_size - 3}px ${font_name}`;
    let author_width = ctx.measureText(author).width;
    ctx.fillText(author, width / 2 - author_width / 2 + pos_x - 100, line_height + 10);

    const text_attributes = {
        square_height: square_height
    };
    /* Debugging for Square Width */
    //◘ctx.rect(pos_x - 10, pos_y - 30, square_width, square_height + 30);
    //ctx.stroke();
    return parseInt(square_height);
}




