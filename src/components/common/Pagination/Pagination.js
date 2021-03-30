import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const {currentPage, totalCount, pageSize, setCurrentPage} = props;

  let pagesCount = Math.ceil(totalCount / pageSize);
  let startPage = currentPage > 2 ? currentPage - 2 : 1;
  let lastPage = currentPage > pagesCount - 2 ? pagesCount : currentPage + 2;

  let middlePages = [];
  for (let i = startPage; i <= lastPage; i++) {
    middlePages.push(i);
  }

  return <div className={styles.paginator}>
    {
      currentPage > 100 && <span
          onClick={(e) => setCurrentPage(currentPage - 50)}>prev 50</span>
    }
    {
      currentPage > 3 && <><span
          onClick={(e) => setCurrentPage(1)}>first</span>
        <span>...</span>
      </>
    }
    {
      middlePages.map(
          (p, index) => <span
              key={index}
              className={currentPage === p ? styles.activePage : 'undefined'}
              onClick={(e) => setCurrentPage(p)}>{p}</span>
      )
    }
    {
      currentPage < pagesCount - 3 &&
      <><span>...</span>
        <span
            onClick={(e) => setCurrentPage(pagesCount)}>{pagesCount}</span>
      </>
    }
    {
      currentPage < pagesCount - 50 &&
        <span
            onClick={(e) => setCurrentPage(currentPage + 50)}>next 50</span>
    }
  </div>
}

export default Pagination;
