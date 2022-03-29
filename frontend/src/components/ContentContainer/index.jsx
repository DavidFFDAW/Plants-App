export function ContentContainer ({ title, center = true, extraCss = {}, extraClass = '', children }) {
    return (
        <div className={`flex ${center}`}>
            <div className={`content-container ${extraClass}`} style={extraCss}>
                <div className="">
                    <div className="col-12">
                            <h1>{title}</h1>
                    </div>
                    
                    {children}
                </div>
            </div>
        </div>
    );
}