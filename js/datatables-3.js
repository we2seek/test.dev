jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "date-eu-pre": function (dateTime) {
        if (!dateTime) {
            return 0;
        }

        // Split date&time to date and time separately:
        // "dd-mm-yyyy hh:ii" => ["dd-mm-yyyy","hh:ii"]
        var date_time = dateTime.split(' ');

        var date;
        if (date_time[0]) {
            date = date_time[0];
        }

        var eu_date = date.split(/[\.\-\/]/);
        var year;

        if (eu_date[2]) {
            year = eu_date[2];
        }
        else {
            year = 0;
        }

        var month = eu_date[1];
        if (month.length == 1) {
            month = 0 + month;
        }

        var day = eu_date[0];
        if (day.length == 1) {
            day = 0 + day;
        }

        var time;
        if (date_time[1]) {
            time = date_time[1];
        }

        var eu_time, hh = 0, mm = 0;
        if (typeof time != 'undefined') {
            eu_time = time.split(':');
            hh = eu_time[0];
            if (hh.length == 1) {
                hh = 0 + hh;
            }

            mm = eu_time[1];
            if (mm.length == 1) {
                mm = 0 + mm;
            }
        }

        return (year + month + day + hh + mm) * 1;
    },

    "date-eu-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "date-eu-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

$(document).ready(function () {
    $("#datatable").DataTable({
        paging: false,
        searching: false,
        ajax: {
            url: 'http://test.dev/datatables-3.json',
            error: function (err) {
                console.log('DataTable.ajax: ' + err.status + ', ' + err.statusText);
                alert("Sorry, something went wrong :(");
            },
        },

        columns: [
            {data: 'id'},
            {data: 'when'},
            {data: 'runtime'},
        ],

        "columnDefs": [{type: 'date-eu', targets: 1}],

    });
});