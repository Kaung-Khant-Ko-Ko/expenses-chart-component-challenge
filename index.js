const labels = $(".chart__label")
  .map(function () {
    return $(this);
  })
  .get();

const categories = $(".chart__category")
  .map(function () {
    return $(this);
  })
  .get();

const bars = $(".bar-chart__bar")
  .map(function () {
    return $(this);
  })
  .get();

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      bars[i].css("height", data[i]["amount"] * 3);

      labels[i].text("$" + data[i]["amount"]);
      categories[i].text(data[i]["day"]);
    }

    const chart_height = $(".chart__bar-chart-container").height();

    for (let j = 0; j < bars.length; j++) {
      labels[j].css("top", chart_height - bars[j].height());
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

for (let k = 0; k < bars.length; k++) {
  bars[k].hover(
    function () {
      if ($(this).height() === $(".chart__bar-chart-container").height()) {
        $(this).css("background-color", "hsla(186, 34%, 60%, 0.75)");
      } else {
        $(this).css("background-color", "hsla(10, 79%, 65%, 0.75)");
      }
      labels[k].animate({ height: labels[k].width() / 1.75 });
    },
    function () {
      $(this).css("background-color", "hsl(10, 79%, 65%)");
      labels[k].animate({ height: "0" });
    }
  );
}
