/** mobile notice **/
'use strict';

/** onload **/
$(function () {
    searchBoardList(1);

    // 검색 버튼 클릭
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
    htmlNm: 'pagination_wrap',
    pageDivNo: 10,
    pageViewNo: 10
}

/**
 * 게시글 리스트 출력
 * @param {Number} pageNo 현재 페이지 번호
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
                let boardList = object.boardList;
                param.totalDataNum = object.boardTotalCount;
                BOARD_LIST_HTML += '<ul>';
                for (let i = 0; i < boardList.length; i++) {
                    let tmpRow = boardList[i];
                    BOARD_LIST_HTML += '    <li class="notice_list">';
                    BOARD_LIST_HTML += '        <a class="notice_link" href="/mobile/noticeDetail?seqNo='+tmpRow.seqNo+'">';
                    BOARD_LIST_HTML += '            <div class="notice_title">'+tmpRow.bultTitlNm+'</div>';
                    BOARD_LIST_HTML += '            <div class="notice_desc">';
                    BOARD_LIST_HTML += '                <span>'+tmpRow.rgmnNm+'</span><span>'+tmpRow.rgDtm+'</span>';
                    BOARD_LIST_HTML += '            </div>';
                    BOARD_LIST_HTML += '        </a>';
                    BOARD_LIST_HTML += '    </li>';
                }
                BOARD_LIST_HTML += '</ul>';

                $('.notice_contents_box').html(BOARD_LIST_HTML);
                setMobilePage(param);
            }
        }
    });
}