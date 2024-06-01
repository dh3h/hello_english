function status_update(target, tbl) {
    $(document).on('change', target, function () {
        let current = $(this);
        entity_status = Number(current.prop('checked') || 0);
        const condition = {
            "id": current.data('id'),
            "col": current.data('col')
        };

        $.ajax({
            url: "http://localhost:3000/admin/change-query-status",
            type: "POST",
            data: { "condition": JSON.stringify(condition), tbl, entity_status },
            success: function (data) {
                const json = JSON.parse(data);
                if (json.status == 1) {
                    // msg('success', json.res)
                }
            }
        });
    });
}

function delete_entity(target, tbl, parent = false) {
    $(document).on('click', target, function () {
        let current = $(this);
        const id = current.data('id');

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "http://localhost:3000/admin/delete-entity",
                    type: "POST",
                    data: { tbl, id },
                    success: function (data) {
                        const json = JSON.parse(data);
                        if (json.status == 1) {
                            msg('success', json.res);
                            if(parent){
                                current.closest(parent).hide(300);
                            }
                        }
                    }
                });
            }
        });

    });
}