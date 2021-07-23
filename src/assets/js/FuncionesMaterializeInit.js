document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, {});
});

function iniciarSelect(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
}

function iniciarCollapsible(){
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
}