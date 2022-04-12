/** notice **/
'use strict';

/** onload **/
$(function () {
    searchBoardList(1);

    $(document).on('click', '#noticeSearch', function () {
        param.searchType = $('#notice_search_type').val();
        param.searchKeyword = $('#notice_search_keyword').val();
        param.searchDateType = $('#notice_search_date_type').val();
        searchBoardList(1);
    });
});

let param = {
    bultTypCd: "NOTICE",
    thisPageNo: 1,
    functionNm: 'searchBoardList',
    htmlNm: 'list_pagination',
    pageDivNo: 10,
    pageViewNo: 10
};

/**
 * 게시글 리스트 호출 함수
 * @param {Number} pageNo 
 */
var searchBoardList = function (pageNo) {
    param.thisPageNo = pageNo;
    ajaxCall({
        method: 'GET',
        url: '/admin/boardList',
        data: param,
        success: function (object) {
            let BOARD_LIST_HTML = '';
            if (Object.keys(object).length > 0) {
                let boardList = object.boardList
                param.totalDataNum = object.boardTotalCount;
                for (let i = 0; i < boardList.length; i++) {
                    let tmpRow = boardList[i];
                    BOARD_LIST_HTML += '<tr>';
                    BOARD_LIST_HTML += '    <td>' + tmpRow.seqNo + '</td>';
                    BOARD_LIST_HTML += '    <td><a href="/admin/noticeDetail?seqNo=' + tmpRow.seqNo + '">' + tmpRow.bultTitlNm + '</a></td>';
                    BOARD_LIST_HTML += '    <td>' + tmpRow.rgmnNm + '</td>';
                    BOARD_LIST_HTML += '    <td>' + tmpRow.rgDtm.substring(0, 11) + '</td>';
                    BOARD_LIST_HTML += '</tr>';
                }
                $('.notice_list > table > tbody').html(BOARD_LIST_HTML);
                setPage(param);
            } else {
                BOARD_LIST_HTML += '<tr>';
                BOARD_LIST_HTML += '    <td colspan="4">조회된 결과가 없습니다.</td>'
                BOARD_LIST_HTML += '</tr>';
                $('.notice_list > table > tbody').html(BOARD_LIST_HTML);
            }
        }
    });
}