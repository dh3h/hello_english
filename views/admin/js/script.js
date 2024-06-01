function status_update(target, tbl){
    $(document).on('change', target, function(){
        let current = $(this);
        entity_status = Number(current.prop('checked') || 0);
        const condition = {
            "id" : current.data('id'),
            "col": current.data('col')
        };

        $.ajax({
            url: "http://localhost:3000/admin/change-query-status",
            type:"POST",
            data: { "condition": JSON.stringify(condition), tbl, entity_status},
            success: function(data){
                console.log(data);
            }
        });
    });
}