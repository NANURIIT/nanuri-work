/** attendance_approve **/
'use strict';

/** onload **/
$(function(){
    getCommonCode();
    getDutyHistoryList(1);

    // 검색버튼 클릭
    $(document).on('click', '#dutySearch', function(){
        // 근무형태가 전체가 아닐경우에만 값을 전달
        if($('#dutyTypeList').val() != 'ALL'){
            param.searchType = $('#dutyTypeList').val();
        }

        getDutyHistoryList(1);

        delete param.searchType;
    });

    // 일괄결재, 부결, 결재취소 클릭
    $(document).on('click', '.allConfirm', function(){
        let flag = true;
        let isChecked = $('input:checkbox[name=checkbox]:checked');
        let param = [];

        if(isChecked.length < 1){
            openPopup({
                title : '실패', 
                text : '체크된 항목이 없습니다.', 
                type : 'error'
            });
        } else {
            let existedCode = '';   // 중복 결재 내용

            for(let i = 0; i <isChecked.length; i++){
                if($(isChecked[i]).parent().parent().children('.confirmCode').attr('id') == $(this).attr('id')
                    || $(isChecked[i]).parent().parent().children('.confirmCode').attr('id') == 'REPORT' && $(this).attr('id') == 'CLEAR'){
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
                    text : existedCode + '인 항목이 있습니다.', 
                    type : 'error'
                });
            }
        }
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
    htmlNm: 'pagination_wrap',
    pageDivNo: 10,
    pageViewNo: 10
};

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 근태 정보 리스트 출력
 */
var getDutyHistoryList = function(pageNo){
    param.thisPageNo = pageNo;

    ajaxCall({
        method : 'GET', 
        url : '/duty/getDutyHistoryList', 
        data : param,
        success : function(object){
            let DUTY_HISTORY_LIST_HTML = '';
            if(!isEmpty(object)){
                let dutyHistoryList = object.dutyHistoryList;
                param.totalDataNum = object.dutyHistoryTotalCount;
                console.log(dutyHistoryList);
                for(let i = 0; i < dutyHistoryList.length; i++){
                    let tmpRow = dutyHistoryList[i];
                    DUTY_HISTORY_LIST_HTML += '<tr>';
                    DUTY_HISTORY_LIST_HTML += ' <td>';
                    DUTY_HISTORY_LIST_HTML += '     <input type="checkbox" name="checkbox" value="'+tmpRow.seqNo+'">';
                    DUTY_HISTORY_LIST_HTML += ' </td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>';
                    DUTY_HISTORY_LIST_HTML += '     <a href="/mobile/dutyConfirmDetail?seqNo='+tmpRow.seqNo+'" title="#">'+tmpRow.userNm+'</a>';
                    DUTY_HISTORY_LIST_HTML += ' </td>';
                    if((isEmpty(tmpRow.edDt) && isEmpty(tmpRow.edTm)) == false){
                        DUTY_HISTORY_LIST_HTML += ' <td>'+tmpRow.stDt+'('+WEEKDAY[new Date(tmpRow.stDt).getDay()]+') ~<br/>'+tmpRow.edDt+'('+WEEKDAY[new Date(tmpRow.edDt).getDay()]+'), '+tmpRow.prd+'일</td>'
                    } else {
                        DUTY_HISTORY_LIST_HTML += ' <td>'+tmpRow.stDt+'('+WEEKDAY[new Date(tmpRow.stDt).getDay()]+') ~</td>'
                    }
                    // DUTY_HISTORY_LIST_HTML += ' <td>2022-04-14(목) ~<br />2022-04-18(월) 18:00, 3일</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td class="confirmCode" id="'+tmpRow.dczStsCd+'">'+tmpRow.dczStsCdnm+'</td>';
                    DUTY_HISTORY_LIST_HTML += '</tr>';
                }
                $('#dutyHistoryList').html(DUTY_HISTORY_LIST_HTML);
                setMobilePage(param);
            } else {
                DUTY_HISTORY_LIST_HTML += '<tr>';
                DUTY_HISTORY_LIST_HTML += ' <td colspan="4">조회된 정보가 없습니다.</td>';
                DUTY_HISTORY_LIST_HTML += '</tr>';

                $('#dutyHistoryList').html(DUTY_HISTORY_LIST_HTML);
                $('.pagination_wrap').empty();
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
        success : getDutyHistoryList(1)
    });
    // FIXME -> getDutyHistoryList(param.thisPageNo)
    // 
}