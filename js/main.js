document.addEventListener("DOMContentLoaded", function () {

    const sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav);

    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute('href').substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    var page = window.location.hash.substr(1);
    if (page == "") page = "dashboard";
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const content = document.querySelector("#content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                }
            }
        };
        xhttp.open("GET", 'pages/' + page + '.html', true);
        xhttp.send();
    }

    // Awal Paralax Effect
    $(window).on('load', function () {
        for (let i = 0; i < 3; i++) {
            setTimeout(function () {
                $('.product').eq(i).addClass('muncul');
            }, 300 * (i + 1));
        }
    });

    $(window).scroll(function () {
        const wScroll = $(this).scrollTop();
        if (wScroll > $('.product').offset().top - 400) {
            $('.product').each(function (i) {
                setTimeout(function () {
                    $('.product').eq(i).addClass('muncul');
                }, 300 * (i + 1));
            });
        }
    });
    // Akhir Paralax Effect

});