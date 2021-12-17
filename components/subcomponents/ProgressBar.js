const ProgressBar = ({ percent }) => {
    return (
        <div className="bar">
            <div className="progress"></div>
            <style jsx>
                {`
                .bar {
                    width: 100%;
                    height: 3rem;
                    border-radius: 9px;
                    box-shadow: inset 0 0 6px 0px #000000b8;
                    background-color: #236357;
                    overflow: none;
                    margin-bottom: 1rem;
                }

                .progress {
                    transition: width 1s;
                    width: ${percent}%;
                    height: 3rem;
                    border-radius: 9px;
                    background: #00d4ff;
                    background: linear-gradient(to bottom right, #00d4ff, #00ff6f);
                }
                @media only screen and (max-width: 36rem) {
                    .count {
                        font-size: 1.5rem;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default ProgressBar