/** employee_list **/
'use strict';

/** onload **/
$(function () {

    // 직원 리스트 호출
    getEmployeeList(1);

    let regDate = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

    // 검색 타입 변경
    $(document).on('change', '#employee_search_type', function(){
        if($('#employee_search_type').val() != 'lastModifyDate'){
            $('#employee_search_keyword').attr('placeholder', '');
        } else if($('#employee_search_type').val() == 'lastModifyDate') {
            $('#employee_search_keyword').attr('placeholder', '2022-01-01');
        }
    });

    // 직원 이름 클릭
    $(document).on('click', '#userNm', function(){
        let userNm = $(this).text();
        let telNo = $(this).parent().parent().children('#telNo').text().replaceAll('-', '');

        let params = {
            userNm : userNm, 
            telNo : telNo
        };
        localStorage.clear();
        localStorage.setItem('userInfo', JSON.stringify(params));
    });

    // 검색 버튼 클릭
    $(document).on('click', '#employeeSearch', function () {

        param.searchType = $('#employee_search_type').val();
        param.searchKeyword = $('#employee_search_keyword').val();

        // 검색 조건이 최종등록일 일 때 날짜 형식이 안맞은 경우 해당 팝업창 띄움.
        if($('#employee_search_type').val() == 'lastModifyDate' && !isEmpty(param.searchKeyword) && !regDate.test(param.searchKeyword)){
            openPopup({
                title : '실패', 
                text : '날짜 형식을 확인해주세요', 
                type : 'error', 
                callback : function(){
                    $(document).on('click', '.confirm', function(){
                        $('#employee_search_keyword').focus();
                    });
                }
            });
        }
        getEmployeeList(1);
    });
});

let param = {
    thisPageNo: 1,
    functionNm: 'getEmployeeList',
    htmlNm: 'list_pagination',
    pageDivNo: 10,
    pageViewNo: 10
};

/**
 * 직원목록 리스트 출력
 * @param {number} pageNo 페이지 번호
 */
var getEmployeeList = function (pageNo) {
    param.thisPageNo = pageNo;
    ajaxCall({
        method: 'GET',
        url: '/employee/employeeList',
        data : param, 
        success: function (object) {
            let EMPLOYEE_LIST_HTML = '';
            if (object.employeeList.length > 0) {
                let employeeList = object.employeeList;
                param.totalDataNum = object.employeeTotalCount;

                for (let i = 0; i < employeeList.length; i++) {
                    let tmpRow = employeeList[i];
                    EMPLOYEE_LIST_HTML += '<tr>';
                    EMPLOYEE_LIST_HTML += ' <td>';
                    EMPLOYEE_LIST_HTML += '     <input type="checkbox">';
                    EMPLOYEE_LIST_HTML += ' </td>';
                    EMPLOYEE_LIST_HTML += ' <td><a href="/admin/employeeAdd" id="userNm">' + tmpRow.userNm + '</a></td>';
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.dtyNm + '</td>';
                    EMPLOYEE_LIST_HTML += ' <td id="telNo">' + formatPhoneNo(tmpRow.telNo) + '</td>';
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.emailAddr + '</td>';
                    if (isEmpty(tmpRow.schoolCareer)) {
                        EMPLOYEE_LIST_HTML += ' <td> - </td>'
                    } else {
                        EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.schoolCareer + '</td>';
                    }
                    EMPLOYEE_LIST_HTML += ' <td>' + tmpRow.addr + '</td>';
                    if(isEmpty(tmpRow.lastModifyDate)){
                        EMPLOYEE_LIST_HTML += ' <td> - </td>';
                    } else {
                        EMPLOYEE_LIST_HTML += ' <td>'+tmpRow.lastModifyDate+'</td>';
                    }
                    EMPLOYEE_LIST_HTML += ' <td>';
                    EMPLOYEE_LIST_HTML += '     <a class="download_link" href="#" download="">';
                    EMPLOYEE_LIST_HTML += '         <img src="/sample/admin/images/ico_download.png" alt="">';
                    EMPLOYEE_LIST_HTML += '     </a>';
                    EMPLOYEE_LIST_HTML += ' </td>';
                    EMPLOYEE_LIST_HTML += '</tr>';
                    $('#employeeList').html(EMPLOYEE_LIST_HTML);
                    setPage(param);
                }
            } else {
                EMPLOYEE_LIST_HTML += '<tr>';
                EMPLOYEE_LIST_HTML += ' <td colspan="9">조회된 결과가 없습니다.</td>';
                EMPLOYEE_LIST_HTML += '</tr>';
                $('#employeeList').html(EMPLOYEE_LIST_HTML);
                $('#list_pagination').empty();
            }
        }
    })
}