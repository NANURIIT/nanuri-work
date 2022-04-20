/** attendance_approve **/
'use strict';

/** onload **/
$(function () {
    getCommonCode();
    getDutyHistoryList();
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
            {
                let COMMON_CODE_HTML = '';
                COMMON_CODE_HTML += '<option value="ALL">전체</option>'
                for (let i = 0; i < object.length; i++) {
                    let tmpRow = object[i];
                    COMMON_CODE_HTML += '<option value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
                }
                $('#dutyTypeList').html(COMMON_CODE_HTML);
            }
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
            console.log(object);
            let DUTY_HISTORY_LIST_HTML = '';
            if (object.dutyHistoryList.length > 0) {
                let dutyHistoryList = object.dutyHistoryList;
                param.totalDataNum = object.dutyHistoryTotalCount;

                for (let i = 0; i < dutyHistoryList.length; i++) {
                    let tmpRow = dutyHistoryList[i];

                    DUTY_HISTORY_LIST_HTML += '<tr>';
                    DUTY_HISTORY_LIST_HTML += ' <td>';
                    DUTY_HISTORY_LIST_HTML += '     <input type="checkbox">';
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
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.dczStsCdnm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>결재 일시</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>결재자이름</td>';
                    if (tmpRow.dczStsCd == 'REPORT' || tmpRow.dczStsCd == 'CLEAR') {
                        DUTY_HISTORY_LIST_HTML += ' <td>';
                        DUTY_HISTORY_LIST_HTML += '     <button class="attendance_button approval_button">결재</button>';
                        DUTY_HISTORY_LIST_HTML += '     <button class="attendance_button reject_button">부결</button>';
                        DUTY_HISTORY_LIST_HTML += ' </td>';
                    } else if (tmpRow.dczStsCd == 'CONFIRM' || tmpRow.dczStsCd == 'REJECT') {
                        DUTY_HISTORY_LIST_HTML += ' <td>';
                        DUTY_HISTORY_LIST_HTML += '     <button class="attendance_button reject_button">결재취소</button>';
                        DUTY_HISTORY_LIST_HTML += ' </td>';

                    }
                    DUTY_HISTORY_LIST_HTML += '</tr>';
                }
                $('#dutyHistoryList').html(DUTY_HISTORY_LIST_HTML);
                setPage(param);
            }
        }
    })
}