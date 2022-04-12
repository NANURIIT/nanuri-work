/** employee_list **/
'use strict';

/** onload **/
$(function () {

    // 직원 리스트 호출
    getEmployeeList(1);

});

let param = {
    thisPageNo: 1,
    functionNm: 'getEmployeeList',
    htmlNm: 'list_pagination',
    pageDivNo: 10,
    pageViewNo: 10
};

var getEmployeeList = function (pageNo) {
    param.thisPageNo = pageNo;
    ajaxCall({
        method: 'GET',
        url: '/employee/employeeList',
        data : param, 
        success: function (object) {
            let EMPLOYEE_LIST_HTML = '';

            if (Object.keys(object).length > 0) {
                let employeeList = object.employeeList;
                param.totalDataNum = object.employeeTotalCount;

                for (let i = 0; i < employeeList.length; i++) {
                    let tmpRow = employeeList[i];
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
                    setPage(param);
                }
            } else {
                EMPLOYEE_LIST_HTML += '<tr>';
                EMPLOYEE_LIST_HTML += ' <td colspan="9">직원 정보가 없습니다.</td>';
                EMPLOYEE_LIST_HTML += '</tr>';
                setPage(param);
            }

            $('#employeeList').html(EMPLOYEE_LIST_HTML);
        }
    })
}