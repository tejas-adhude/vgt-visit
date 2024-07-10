let str = "welcome to VGT visit";
let wel_span = document.createElement("span");
wel_span.setAttribute("class", "welcome-span welcome-span3");
wel_span.setAttribute("id", "wel-span");
let wel_ani = document.getElementById("wel-ani");
wel_ani.replaceWith(wel_span);
let i = 0;

let a = setInterval(function() {
  char = str[i];
  wel_span.innerHTML = wel_span.innerHTML + char;
  if (i == ((str.length) - 1)) {
    clearInterval(a);

    let b = setTimeout(function() {
      wel_span.replaceWith(wel_ani);
      clearTimeout(b);
    }, 2000)
  }
  i++;
}, 100);