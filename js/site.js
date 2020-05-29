$(".toggle").click(function() {
  let total = $(this).data("total");
  let iconElem = $(this).find(".icon");

  if (total === undefined) {
    iconElem.toggleClass("opaque");
    return;
  }

  let current = Number($(this).attr("data-current"));
  if (Number.isNaN(current)) {
    current = 0;
  }

  let new_current = (current + 1) % (Number(total) + 1);
  $(this).attr("data-current", new_current)

  let numberElem = $(this).find(".number");
  if (new_current !== 0) {
    numberElem.attr("src", `img/${new_current}.png`);
  }

  if (new_current === 0) {
    iconElem.removeClass("opaque");
    numberElem.removeClass("opaque");
  } else if (new_current === 1) {
    iconElem.addClass("opaque");
  } else {
    numberElem.addClass("opaque");
  }
});
