import {type FormEvent, useEffect, useState} from "react";
import './Toolbar.css';


interface Props {
    initialQuery: string;
    onSearch: (query: string) => void;
    page: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    onPageSizeChange: (size: number) => void;
}

export const Toolbar = 
    ({ initialQuery, onSearch, page, onPageChange, pageSize, onPageSizeChange }: Props) => {
    const [inputValue, setInputValue] = useState(initialQuery);
    
    const [localPage, setLocalPage] = useState(page.toString());
    const [localPageSize, setLocalPageSize] = useState(pageSize.toString());
    
    useEffect(() => {
        setLocalPage(page.toString());
    }, [page]);
    
    useEffect(() => {
        setLocalPageSize(pageSize.toString());
    }, [pageSize]);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(inputValue);
    };
    
    // validator for page and pageSize inputs
        
    const handlePageBlurOrEnter =
        (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (e.type == 'blur' || (es as React.KeyboardEvent).key == 'Enter') {
            const newPage = Math.max(1, parseInt(localPage) || 1);
            setLocalPage(newPage.toString());
            if (newPage !== page) onPageChange(newPage);}
    };    
    
    const handlePageSizeBlurOrEnter = 
        (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (e.type == 'blur' || (es as React.KeyboardEvent).key == 'Enter') {
            const newSize = Math.max(1, parseInt(localPageSize) || 10);
            setLocalPageSize(newSize.toString());
            if (newSize !== pageSize) onPageSizeChange(newSize);
        }
    };
        
    return (
        <div className="toolbar-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What about potato?"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Explore
                </button>
            </form>
            
            <div className="tools-container">
                <span className="tools-label">Tools:</span>

                <div className="pagination-inputs">
                    <label className="tool-label">
                        Page:
                        <input
                            type="number"
                            min="1"
                            value={localPage}
                            onChange={(e) => setLocalPage(e.target.value)}
                            onBlur={handlePageBlurOrEnter}
                            onKeyDown={handlePageBlurOrEnter}
                            className="tool-number-input"
                        />
                    </label>

                    <label className="tool-label">
                        Size:
                        <input
                            type="number"
                            min="1"
                            value={localPageSize}
                            onChange={(e) => setLocalPageSize(e.target.value)}
                            onBlur={handlePageSizeBlurOrEnter}
                            onKeyDown={handlePageSizeBlurOrEnter}
                            className="tool-number-input"
                        />
                    </label>
                </div>

                <select disabled className="tool-select">
                    <option>Categories (Soon)</option>
                </select>

                <select disabled className="tool-select">
                    <option>Brands (Soon)</option>
                </select>
            </div>
        </div>
    );
};