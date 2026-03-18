import {useUrlState} from "./hooks/useUrlState.ts";
import {Toolbar} from "./components/Toolbar.tsx";

function App() {
  const { requestParams, updateSearch, updatePage, updatePageSize } = useUrlState();

  // const { products, loading, error } = useProducts(requestParams); TODO: implement it later
  
  return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Toolbar
            initialQuery={requestParams.typedWord || ''}
            onSearch={updateSearch}
            page={requestParams.page}
            onPageChange={updatePage}
            pageSize={requestParams.pageSize}
            onPageSizeChange={updatePageSize}
        />
      </div>
  );
}

export default App;