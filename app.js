var url = "data.json";

var type = "all";
var city = "all";

loadDropdowns();
drawTable(type, city);

$("#types").on("change", function (e) {
    type = this.value;
    drawTable(type, city);
});

$("#cities").on("change", function (e) {
    city = this.value;
    drawTable(type, city);
});

function loadDropdowns() {
    var cities = [];
    var types = [];

    $.getJSON(url, function (data) {
        try {
            if (data != null && data["all"].places.length > 0) {
                data["all"].places.forEach((element) => {
                    if (!cities.includes(element.city)) {
                        cities.push(element.city);
                    }

                    if (!types.includes(element.type)) {
                        types.push(element.type);
                    }
                });
            } else {
            }
        } catch { }

        cities.push("all");
        types.push("all");

        cities.sort();
        types.sort();

        cities.forEach((city) => {
            $("#cities").append(
                $("<option>", {
                    value: city,
                    text: city,
                })
            );
        });

        types.forEach((type) => {
            $("#types").append(
                $("<option>", {
                    value: type,
                    text: type,
                })
            );
        });
    });
}

function drawTable(type, city) {
    $("#RestaurantTable").empty();
    var headerTr = "<tr><th>Title</th><th>Address</th><th>Suggestion(s)</th></tr>";
    $("#RestaurantTable").append(headerTr);

    $.getJSON(url, function (data) {
        var places = [];

        try {
            if (data != null && data["all"].places.length > 0) {
                data["all"].places.forEach((element) => {
                    if (type == "all" && city == "all") {
                        places.push(element);
                    }
                    else if (type == "all" && city != "") {
                        if (city == element.city) {
                            places.push(element);
                        }
                    }
                    else if (type != "" && city == "all") {
                        if (type == element.type) {
                            places.push(element);
                        }
                    }
                    else { //type != "" && city != ""
                        if (city == element.city && type == element.type) {
                            places.push(element);
                        }
                    }
                });

                places = Object.values(places).sort(function (a, b) {
                    return a.title > b.title ? 1 : -1;
                });

                places.forEach((place) => {
                    var newTr =
                        "<tr><td>" +
                        place.title +
                        "</td><td>" +
                        place.address +
                        "</td><td>" +
                        place.suggestions +
                        "</td></tr>";

                    $("#RestaurantTable").append(newTr);
                });

            } else {
                drawBlankRow();
            }
        } catch {
            drawBlankRow();
        }
    });
}

function drawBlankRow() {
    var newTr = "There is no data";
    $("#RestaurantTable").append(newTr);
}

function changeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    if ($("button").text().includes("Dark")) {
        $("button").text("Light Mode");
    } else {
        $("button").text("Dark Mode");
    }
}