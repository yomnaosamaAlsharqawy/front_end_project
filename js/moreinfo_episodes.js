$(document).ready(function(){

    $(".ep_section").hover(function(){
        $(this).find(".hover_icon").css('display','block');
    }
    ,function(){
        $(this).find(".hover_icon").css('display','none');
    });
  $(".season_menue1 a").click(function() {
      var a_text = $(this).children().text();
    //   console.log(a_text);
      $(".season_menue").text(a_text);
  });
  });
function showepisodes(){
    var x = document.getElementById("hidden_episodes");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("showmore").style.display = "none";
    } else {
      x.style.display = "none";
      document.getElementById("showmore").style.display = "block";
    }
}
