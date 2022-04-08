/** employee_list **/
'use strict';

/** onload **/
$(function () {

    // 직원 리스트 호출
    getEmployeeList();
});

var getEmployeeList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/employeeList',
        success: function (object) {
            let EMPLOYEE_LIST_HTML = '';

            if (object.length > 0) {
                for (let i = 0; i < object.length; i++) {
                    let tmpRow = object[i];
                    EMPLOYEE_LIST_HTML += '<tr>';
                    EMPLOYEE_LIST_HTML += ' <td>';
                    EMPLOYEE_LIST_HTML += '     <input type="checkbox">';
                    EMPLOYEE_LIST_HTML += ' </td>';
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.userNm + '</td>';
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.dtyNm + '</td>';
                    EMPLOYEE_LIST_HTML += ' <td>' + formatPhoneNo(tmpRow.telNo) + '</td>';
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.emailAddr + '</td>';
                    if (isEmpty(tmpRow.dtlCnm)) {
                        EMPLOYEE_LIST_HTML += ' <td> - </td>'
                    } else {
                        EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.dtlCnm + '</td>';
                    }
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.addr + '</td>';
                    EMPLOYEE_LIST_HTML += ' <td>2022-03-23</td>';
                    EMPLOYEE_LIST_HTML += ' <td>';
                    EMPLOYEE_LIST_HTML += '     <a class="download_link" href="#" download="">';
                    EMPLOYEE_LIST_HTML += '         <img src="/sample/admin/images/ico_download.png" alt="">';
                    EMPLOYEE_LIST_HTML += '     </a>';
                    EMPLOYEE_LIST_HTML += ' </td>';
                    EMPLOYEE_LIST_HTML += '</tr>';
                }
            } else {
                EMPLOYEE_LIST_HTML += '<tr>';
                EMPLOYEE_LIST_HTML += ' <td colspan="9">직원 정보가 없습니다.</td>';
                EMPLOYEE_LIST_HTML += '</tr>';
            }

            $('#employeeList').html(EMPLOYEE_LIST_HTML);
        }
    })
}