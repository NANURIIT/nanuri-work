/** attendance_approve **/
'use strict';

/** onload **/
$(function () {
    
    getCommonCode();
    getDutyHistoryList();

    // 검색 버튼 클릭
    $(document).on('click', '#dutySearch', function () {
        // 근무 형태가 전체가 아닐경우에만 값을 전달
        if ($('#dutyTypeList').val() != 'ALL') {
            param.searchType = $('#dutyTypeList').val();
        }
        getDutyHistoryList(1);

        delete param.searchType;
    });

    $(document).on('click', '.allConfirm', function(){
        let flag = true;            // 중복 결재 내용이 있으면 false 없으면 true
        let isChecked = $('input:checkbox[name=checkbox]:checked');
        let param = [];

        if(isChecked.length < 1){
            openPopup({
                title : '실패', 
                text : '한개이상 체크해주세요', 
                type : 'error'
            });
        } else {
            let existedCode = '';   // 중복 결재 내용

            for(let i = 0; i <isChecked.length; i++){
                if($(isChecked[i]).parent().parent().children('.confirmCode').attr('id') == $(this).attr('id')){
                    flag = false;
                    existedCode = $(isChecked[i]).parent().parent().children('.confirmCode').text();
                    break;
                }
                param.push({
                    seqNo : isChecked[i].value, 
                    dczStsCd : $(this).attr('id')
                });
            } 

            if(flag){
                allPayment(param);
            } else {
                openPopup({
                    title : '실패', 
                    text : existedCode + '인 근태가 있습니다.', 
                    type : 'error'
                });
            }
            
        }
    });

    // 결재, 부결, 결재취소
    $(document).on('click', '.attendance_button', function () {    
        let params = {
            dczStsCd : $(this).attr('class').split(' ')[2],
            seqNo : $(this).parent().parent().attr('id')
        }
        attendance(params);
    });
});

/**
 * 근태유형 출력
 */
var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        data: { dsCd: 'DUTY' },
        success: function (object) {
            let COMMON_CODE_HTML = '';
            COMMON_CODE_HTML += '<option value="ALL">전체</option>'
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#dutyTypeList').html(COMMON_CODE_HTML);
        }
    });
}

let param = {
    thisPageNo: 1,
    functionNm: 'getDutyHistoryList',
    htmlNm: 'list_pagination',
    pageDivNo: 10,
    pageViewNo: 10
};

/**
 * 근태 정보 리스트 출력
 */
var getDutyHistoryList = function () {
    ajaxCall({
        method: 'GET',
        url: '/duty/getDutyHistoryList',
        data: param,
        success: function (object) {
            let DUTY_HISTORY_LIST_HTML = '';
            if (object.dutyHistoryList.length > 0) {
                let dutyHistoryList = object.dutyHistoryList;
                param.totalDataNum = object.dutyHistoryTotalCount;

                for (let i = 0; i < dutyHistoryList.length; i++) {
                    let tmpRow = dutyHistoryList[i];

                    DUTY_HISTORY_LIST_HTML += '<tr id="' + tmpRow.seqNo + '">';
                    DUTY_HISTORY_LIST_HTML += ' <td>';
                    DUTY_HISTORY_LIST_HTML += '     <input type="checkbox" name="checkbox" value="'+tmpRow.seqNo+'">';
                    DUTY_HISTORY_LIST_HTML += ' </td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>사번</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.userNm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.dtyNm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.blgNm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>기준일자</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.svceFormCdNm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>차감후 휴가일수</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>전체 기간</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.rgDtm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td class="confirmCode" id="'+tmpRow.dczStsCd+'">' + tmpRow.dczStsCdnm + '</td>';
                    if (isEmpty(tmpRow.dczDtm)) {
                        DUTY_HISTORY_LIST_HTML += ' <td> - </td>';
                    } else {
                        DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.dczDtm + '</td>';
                    }
                    if (isEmpty(tmpRow.dczmnId)) {
                        DUTY_HISTORY_LIST_HTML += ' <td> - </td>';
                    } else {
                        DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.dczmnId + '</td>';
                    }

                    if (tmpRow.dczStsCd == 'REPORT' || tmpRow.dczStsCd == 'CLEAR') {
                        DUTY_HISTORY_LIST_HTML += ' <td>';
                        DUTY_HISTORY_LIST_HTML += '     <button class="attendance_button approval_button CONFIRM">결재</button>';
                        DUTY_HISTORY_LIST_HTML += '     <button class="attendance_button reject_button REJECT">부결</button>';
                        DUTY_HISTORY_LIST_HTML += ' </td>';
                    } else if (tmpRow.dczStsCd == 'CONFIRM' || tmpRow.dczStsCd == 'REJECT') {
                        DUTY_HISTORY_LIST_HTML += ' <td>';
                        DUTY_HISTORY_LIST_HTML += '     <button class="attendance_button reject_button CLEAR">결재취소</button>';
                        DUTY_HISTORY_LIST_HTML += ' </td>';
                    }

                    DUTY_HISTORY_LIST_HTML += '</tr>';

                    $('#dutyHistoryList').html(DUTY_HISTORY_LIST_HTML);
                    setPage(param);
                }
            } else {
                DUTY_HISTORY_LIST_HTML += '<tr>'
                DUTY_HISTORY_LIST_HTML += ' <td colspan="12">조회된 정보가 없습니다.</td>';
                DUTY_HISTORY_LIST_HTML += '</tr>'
                $('#dutyHistoryList').html(DUTY_HISTORY_LIST_HTML);
                $('#list_pagination').empty();
            }
        }
    });
}

/**
 * 일괄결재
 * @param {string} param.seqNo 일련번호
 * @param {string} param.dczStsCd 결재코드
 */
var allPayment = function(params){
    ajaxCall({
        method : 'PATCH', 
        url : '/duty/allPayment', 
        data : params, 
        success : getDutyHistoryList
    });
}

/**
 * 결재, 부결, 결재취소
 */
var attendance = function(params) {
    console.log(params);
    ajaxCall({
        method : 'PATCH',
        url : '/duty/attendance',
        data : params,
        success : getDutyHistoryList
    });
}