/** attendance_list **/
'use strict';

/** onload **/
$(function () {

    getCommonCode();
    getDutyHistoryList(1);

    $('#attendance_date').val(new Date().getFullYear());

    // 검색 버튼 클릭
    $(document).on('click', '#dutySearch', function () {
        // 근무형태가 전체가 아닐경우에만 값을 전달
        if ($('#dutyTypeList').val() != 'ALL') {
            param.searchType = $('#dutyTypeList').val();
        }
        param.searchKeyword = $('#employee_name').val();
        param.searchDate = $('#attendance_date').val();

        getDutyHistoryList(1);

        delete param.searchType;
        delete param.searchKeyword;
        delete param.searchDate;
    });
});

/**
 * 근태 유형 출력
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
    pageViewNo: 10,
    searchDate: '2022'
};

/**
 * 근태 정보 리스트 출력
 */
var getDutyHistoryList = function (pageNo) {
    param.thisPageNo = pageNo;
    ajaxCall({
        method: 'GET',
        url: '/duty/getDutyHistoryList',
        data: param,
        success: function (object) {

            let DUTY_HISTORY_LIST_HTML = '';
            if (!isEmpty(object)) {
                let dutyHistoryList = object.dutyHistoryList;
                param.totalDataNum = object.dutyHistoryTotalCount;

                for (let i = 0; i < dutyHistoryList.length; i++) {
                    let tmpRow = dutyHistoryList[i];
                    
                    DUTY_HISTORY_LIST_HTML += '<tr>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.telNo.substring(3, tmpRow.telNo.length) + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.userNm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.dtyNm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.blgNm + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.basDt + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.svceFormCdNm + '</td>';
<<<<<<< HEAD
                    if (tmpRow.svceFormCd == 'OFF_DUTY' || tmpRow.svceFormCd == 'FIRST_DUTY' || tmpRow.svceFormCd == 'SECOND_DUTY' && !isEmpty(tmpRow.sbtAftVctnDys)) {
=======
                    if (tmpRow.svceFormCd == 'OFF_DUTY' || tmpRow.svceFormCd == 'FIRST_DUTY' || tmpRow.svceFormCd == 'SECOND_DUTY') {
>>>>>>> b20b998 ([FIX] 회사 소속 이력에 현재 재직시 총 경력 및 재직 기간이 비정상적으로 출력되는 현상 수정)
                        if (tmpRow.sbtAftVctnDys % 1 === 0) {
                            DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.sbtAftVctnDys.substring(0, tmpRow.sbtAftVctnDys.length - 3) + '</td>';
                        } else {
                            DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.sbtAftVctnDys.substring(0, tmpRow.sbtAftVctnDys.length - 1) + '</td>';
                        }
                    } else {
                        DUTY_HISTORY_LIST_HTML += ' <td> - </td>'
                    }
                    if (tmpRow.dtlDsCd == 'ON_DUTY') {
                        if ((isEmpty(tmpRow.edDt) && isEmpty(tmpRow.edTm)) == false) {
                            DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.stDt + '(' + WEEKDAY[new Date(tmpRow.stDt).getDay()] + ')' + ' ' + tmpRow.stTm.substring(0, tmpRow.stTm.length - 3) + ' ~ ' + '<br>' + tmpRow.edDt + '(' + WEEKDAY[new Date(tmpRow.edDt).getDay()] + ')' + ' ' + tmpRow.edTm.substring(0, tmpRow.edTm.length - 3) + '</td>';
                        } else {
                            DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.stDt + '(' + WEEKDAY[new Date(tmpRow.stDt).getDay()] + ')' + ' ' + tmpRow.stTm.substring(0, tmpRow.stTm.length - 3) + ' ~ ' + '</td>'
                        }
                    } else if (tmpRow.dtlDsCd == 'OFF_DUTY') {
                        if ((isEmpty(tmpRow.edDt) && isEmpty(tmpRow.edTm)) == false) {
                            DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.stDt + '(' + WEEKDAY[new Date(tmpRow.stDt).getDay()] + ')' + ' ' + tmpRow.stTm.substring(0, tmpRow.stTm.length - 3) + ' ~ ' + '<br>' + tmpRow.edDt + '(' + WEEKDAY[new Date(tmpRow.edDt).getDay()] + ')' + ' ' + tmpRow.edTm.substring(0, tmpRow.edTm.length - 3) + ', ' + tmpRow.prd + '일' + '</td>';
                        } else {
                            DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.stDt + '(' + WEEKDAY[new Date(tmpRow.stDt).getDay()] + ')' + ' ' + tmpRow.stTm.substring(0, tmpRow.stTm.length - 3) + ' ~ ' + '</td>'
                        }
                    }
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.rgDtm.substring(0, 10) + '(' + WEEKDAY[new Date(tmpRow.rgDtm.substring(0, 10)).getDay()] + ')' + '<br>' + tmpRow.rgDtm.substring(11, tmpRow.rgDtm.length - 3) + '</td>';
                    DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.dczStsCdnm + '</td>';
                    if (isEmpty(tmpRow.dczDtm)) {
                        DUTY_HISTORY_LIST_HTML += ' <td>-</td>';
                    } else {
                        DUTY_HISTORY_LIST_HTML += ' <td>' + tmpRow.dczDtm.substring(0, 10) + '<br>' + tmpRow.dczDtm.substring(11, tmpRow.dczDtm.length - 3) + '</td>';
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
    })
}