/** attendance_list **/
'use strict';

/** onload **/
$(function(){
    getCommonCode();
    getDutyHistoryList(1);

    $(document).on('click', '#dutySearch', function(){
        // 근무형태가 전체가 아닐경우에만 값을 전달
        if($('#dutyTypeList').val() != 'ALL'){
            param.searchType = $('#dutyTypeList').val();
        }

        getDutyHistoryList(1);

        delete param.searchType;
    });
});

/**
 * 근태 유형 출력
 */
 var getCommonCode = function(){
    ajaxCall({
        method : 'GET', 
        url : '/employee/getCommonCode', 
        data : { dsCd : 'DUTY'}, 
        success : function(object){{
            let COMMON_CODE_HTML = '';
            COMMON_CODE_HTML += '<option value="ALL">전체</option>'
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#dutyTypeList').html(COMMON_CODE_HTML);
        }}
    });
}

let param = {
    thisPageNo: 1,
    functionNm: 'getDutyHistoryList',
    htmlNm: 'pagination_wrap',
    pageDivNo: 10,
    pageViewNo: 10
};

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

                for(let i = 0; i < dutyHistoryList.length ; i++){
                    let tmpRow = dutyHistoryList[i];
                    DUTY_HISTORY_LIST_HTML += '<tr>';
                    DUTY_HISTORY_LIST_HTML += ' <td>';
                    DUTY_HISTORY_LIST_HTML += '     <a href="/mobile/dutyListDetail?seqNo='+tmpRow.seqNo+'">'+tmpRow.userNm+'</a>';
                    DUTY_HISTORY_LIST_HTML += ' </td>';
                    if((isEmpty(tmpRow.edDt) && isEmpty(tmpRow.edTm)) == false){
                        DUTY_HISTORY_LIST_HTML += ' <td>'+tmpRow.stDt+'('+WEEKDAY[new Date(tmpRow.stDt).getDay()]+') ~<br/>'+tmpRow.edDt+'('+WEEKDAY[new Date(tmpRow.edDt).getDay()]+'), '+tmpRow.prd+'일</td>'
                    } else {
                        DUTY_HISTORY_LIST_HTML += ' <td>'+tmpRow.stDt+'('+WEEKDAY[new Date(tmpRow.stDt).getDay()]+') ~</td>'
                    }

                    DUTY_HISTORY_LIST_HTML += ' <td>'+tmpRow.dczStsCdnm+'</td>';
                    DUTY_HISTORY_LIST_HTML += '</tr>';

                    $('#dutyHistoryList').html(DUTY_HISTORY_LIST_HTML);
                    setMobilePage(param);
                }
            } else {
                DUTY_HISTORY_LIST_HTML += '<tr>';
                DUTY_HISTORY_LIST_HTML += ' <td colspan="3">조회된 정보가 없습니다.</td>';
                DUTY_HISTORY_LIST_HTML += '</tr>';

                $('#dutyHistoryList').html(DUTY_HISTORY_LIST_HTML);
                $('.pagination_wrap').empty();
            }
        }
    });
}