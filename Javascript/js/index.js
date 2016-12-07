$(function() {
    $.get("https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/maxitem.json",
        function(data, textStatus, jqXHR) {
            $('#loader').remove();
            listcount = data;
            getItems(listcount, 1);
            $(window).scroll(function() {
                if ($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
                    $('#loader').remove();
                    getItems(listcount, 1);
                }
                return;
            });
        }

    ).fail(function() {
        $('#loader').remove();
        $('#storybox').append(`
                <div id='error'>
                    <h5>Error Loading content</h5>
                    <h5>Reload Page</h5>     
                </div>
            `);
    })
})

function getItems(count, iter) {
    $('#storybox').append(`
        <img src="img/default.svg" id="loader" alt="" width="100px">
    `)
    $.ajax({
        type: "GET",
        url: "https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/" + count + ".json ",
        success: function(response) {
            $('#loader').remove();
            console.log(response);
            $('#error').remove();
            if (response.type == "story") {
                if (!response.deleted) {
                    if (response.url) {
                        var urlsplit = response.url.split('/');
                        var today = Date.now() / 1000;;
                        var d_day = response.time;
                        var diff = today - d_day;
                        minutes = diff / 60;
                        hours = diff / 3600;
                        days = diff / 86400;
                        years = diff / 31536000;
                        var time;
                        if (Math.floor(minutes) < 1) {
                            time = Math.floor(diff) + "second(s) ago";
                        }
                        if (Math.floor(minutes) >= 1) {
                            time = Math.floor(minutes) + "minute(s) ago";
                        }

                        if (Math.floor(hours) >= 1) {
                            time = Math.floor(hours) + "hour(s) ago";
                        }

                        if (Math.floor(days) >= 1) {
                            time = Math.floor(days) + "day(s) ago"
                        }
                        var res_descendants;
                        if (response.descendants) {
                            res_descendants = response.descendants;
                        } else {
                            res_descendants = 0;
                        }

                        // console.log(Math.floor(hours));
                        $('#stories').append(`
                 <li class="list-group-item">
                         <p>` + response.title + ` <a href='` + response.url + `'>(` + urlsplit[2] + `)</a></p>
                         <span>` + response.score + `</span> points by <span>` + response.by + `</span> <span>` + time + `</span> <span>` + res_descendants + ` comments</span>
                     </li>
             `);
                    } else if (!response.url) {
                        var today = Date.now() / 1000;;
                        var d_day = response.time;
                        var diff = today - d_day;
                        minutes = diff / 60;
                        hours = diff / 3600;
                        days = diff / 86400;
                        years = diff / 31536000;
                        var time;
                        if (Math.floor(minutes) < 1) {
                            time = Math.floor(diff) + "seconds ago";
                        }
                        if (Math.floor(minutes) >= 1) {
                            time = Math.floor(minutes) + "minutes ago";
                        }

                        if (Math.floor(hours) >= 1) {
                            time = Math.floor(hours) + "hours ago";
                        }

                        if (Math.floor(days) >= 1) {
                            time = Math.floor(days) + "days ago"
                        }

                        var res_descendants;
                        if (response.descendants) {
                            res_descendants = response.descendants;
                        } else {
                            res_descendants = 0;
                        }
                        // console.log(Math.floor(hours));
                        $('#stories').append(`
                 <li class="list-group-item">
                         <p>` + response.title + `</p>
                         <span>` + response.score + `</span> points by <span>` + response.by + `</span> <span>` + time + `</span> <span>` + response.descendants + ` comments</span>
                     </li>
             `);
                    }
                }

            }



            listcount--;
            iter++
            if (iter < 100) {
                getItems(listcount, iter);
            }

        },
        error: function(xhr, status) {
            $('#loader').remove();
            $('#storybox').append(`
                <div id='error'>
                    <h5>Error Loading content</h5>    
                     <h5>Reload Page</h5>
                </div>
            `);
        }


    });
    return;
}