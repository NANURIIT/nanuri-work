/** mobile employee_list **/
'use strict';

/** onload **/
$(function () {

    // 직원 리스트 호출
    getEmployeeList(1);

    // 검색 버튼 클릭
    $(document).on('click', '#employeeSearch', function () {
        param.searchType = $('#employee_search_type').val();
        param.searchKeyword = $('#employee_search_keyword').val();
        getEmployeeList(1);
    });

    $(document).on('click', '#userNm', function(){
        let userNm = $(this).text();
        let telNo = $(this).parent().parent().children('.telNo').text().replaceAll('-', '');
        let param = {
            userNm : userNm, 
            telNo : telNo
        };
        localStorage.setItem('userInfo', JSON.stringify(param));
    });

});

let param = {
    thisPageNo: 1,
    functionNm: 'getEmployeeList',
    htmlNm: 'pagination_wrap',
    pageDivNo: 10,
    pageViewNo: 10
};

var getEmployeeList = function (pageNo) {
    param.thisPageNo = pageNo;
    ajaxCall({
        method: 'GET',
        url: '/employee/employeeList',
        data: param,
        success: function (object) {
            let EMPLOYEE_LIST_HTML = '';
            if (object.employeeList.length > 0) {
                let employeeList = object.employeeList;
                param.totalDataNum = object.employeeTotalCount;

                for (let i = 0; i < employeeList.length; i++) {
                    let tmpRow = employeeList[i];
                    EMPLOYEE_LIST_HTML += '<tr>';
                    EMPLOYEE_LIST_HTML += ' <td>';
                    EMPLOYEE_LIST_HTML += '     <a href="/mobile/employeeAdd" id="userNm">' + tmpRow.userNm + '</a>';
                    EMPLOYEE_LIST_HTML += ' </td>';
                    EMPLOYEE_LIST_HTML += ' <td class="telNo">' + formatPhoneNo(tmpRow.telNo) + '</td>';
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.emailAddr + '</td>';
                    EMPLOYEE_LIST_HTML += '</tr>';
                }
                $('#employeeList').html(EMPLOYEE_LIST_HTML);
                setMobilePage(param);
            } else {
                EMPLOYEE_LIST_HTML += '<tr>';
                EMPLOYEE_LIST_HTML += '   <td colspan="3">조회된 결과가 없습니다.</td>';
                EMPLOYEE_LIST_HTML += '</tr>';
                $('#employeeList').html(EMPLOYEE_LIST_HTML);
                $('.pagination_wrap').empty();
            }
        }
    });
}   