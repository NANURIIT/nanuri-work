/** common **/
'use strict';

/** onload **/
$(function () {
    searchBoardList(1);
});

let param = {
    bultTypCd: "NOTICE",
    thisPageNo: 1,
    functionNm: 'searchBoardList',
    htmlNm: 'list_pagination',
    pageDivNo: 10,
    pageViewNo: 10
};

var searchBoardList = function (pageNo) {
    param.thisPageNo = pageNo;
    ajaxCall({
        method: 'GET',
        url: '/admin/boardList',
        data: param,
        success: function (object) {
            let BOARD_LIST_HTML = '';
            let boardList = object.boardList
            param.totalDataNum = object.boardTotalCount;
            for (let i = 0; i < boardList.length; i++) {
                BOARD_LIST_HTML += '<tr>';
                BOARD_LIST_HTML += '    <td>' + boardList[i].seqNo + '</td>';
                BOARD_LIST_HTML += '    <td><a href="/admin/noticeDetail?seqNo=' + boardList[i].seqNo + '">' + boardList[i].bultTitlNm + '</a></td>';
                BOARD_LIST_HTML += '    <td>' + boardList[i].rgmnNm + '</td>';
                BOARD_LIST_HTML += '    <td>' + boardList[i].rgDtm.substring(0, 11) + '</td>';
                BOARD_LIST_HTML += '</tr>';
            }
            $('.notice_list > table > tbody').html(BOARD_LIST_HTML);
            setPage(param);
        }
    });
}