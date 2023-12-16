<form id="logout-form" action="/logout" method="POST" style="display: none;">
    @csrf
</form>
<script>

    localStorage.clear();
    //window.location = "/";
    document.getElementById("logout-form").submit();

    ////////////LOGOUT, se guarda las iniciales.
    /*
    var tracks_iniciales = [];
    for (let index = 0; index < 6; index++) {
        tracks_iniciales.push(JSON.parse(localStorage.local_tracks)[index]);
    }
    localStorage.local_tracks = JSON.stringify(tracks_iniciales);

    document.getElementById("logout-form").submit();
    */

</script>