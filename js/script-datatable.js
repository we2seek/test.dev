$(document).ready(function () {
    $('#myTable').dataTable({
        "ajax": {
            "url": 'http://test.dev/php/json_users.php',
            "dataSrc": '',
        },

        "columns": [
            {"data": "id"},
            {"data": "fio"},
            {
                // reg_date
                "data": null,
                "render": function (data) {
                    var date = new Date(data.reg_date * 1000);
                    var yyyy = date.getFullYear().toString();
                    var mm = (date.getMonth() + 1).toString();
                    if (mm.length < 2) {
                        mm = "0" + mm;
                    }
                    var dd = date.getDate().toString();
                    if (dd.length < 2) {
                        dd = "0" + dd;
                    }
                    var hh = date.getHours().toString();
                    if (hh.length < 2) {
                        hh = "0" + hh;
                    }
                    var min = date.getMinutes().toString();
                    if (min.length < 2) {
                        min = "0" + min;
                    }
                    var sec = date.getSeconds().toString();
                    if (sec.length < 2) {
                        sec = "0" + sec;
                    }
                    return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + sec;
                },

            },
            {
                // role_id
                "data": null,
                "render": function (data) {
                    switch (data.role_id) {
                        case "1":
                            return "Sysadmin";
                        case "2":
                            return "Admin";
                        case "3":
                            return "Dispatcher";
                        case "4":
                            return "Master";
                        case "5":
                            return "Client";
                        default:
                            return "Unknown role";
                    }
                }
            },
        ],

        "order": [[3, "desc"]],

        "language": {
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "infoPostFix": "",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            },
            "aria": {
                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
            }
        },

    });
});