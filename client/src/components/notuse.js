const formatTextbook = () => {
    if (textbook.length === 0) {
        return (
            <ListItem>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={false}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': 0 }}
                    />
                </ListItemIcon>
                <ListItemText primary="Select a textbook first" />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                        <BookIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    let book = TEXTBOOKS[textbook];
    let buffer = [];
    let copyC = openC;
    for (let ele of book) {
        openC[ele.chapterName] = false
        copyC[ele.chapterName] = false
        buffer.push((<ListItem key={ele.chapterName} >
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': 0 }}
                    onChange={checkChange}
                    name="main"
                />
            </ListItemIcon>
            <ListItemText primary={ele.chapterName} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={handleClick} >
                    {openCC ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        ));

        ele.subChapter.map(chapter => {
            buffer.push((
                <Collapse in={openCC} timeout="auto" unmountOnExit key={chapter.chapterName + "Collapse"} >
                    <ListItem className={classes.nested} id={chapter.chapterName}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': 1 }}
                                value={chapter.chapterName}
                                onChange={checkChange}
                                name="sub"
                            />
                        </ListItemIcon>
                        <ListItemText primary={chapter.chapterName} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <BookmarksIcon />
                            </IconButton>

                        </ListItemSecondaryAction>
                    </ListItem>
                </Collapse>
            ));
        })
    }

    renderFinish(copyC);
    return buffer;
}

const handleClick2 = event => {
  let name = "Ch.1 Science of Physics";
  let old = !openC[name];
  openC[name] = old;
  console.log(openC);
  setOpenC(openC);
};

const handleClick = event => {
  console.log("object");
  setOpenCC(!openCC);
};

const renderFinish = arr => {
  setTimeout(() => {
    setOpenC(arr);
    console.log(arr);
  }, 1000);
};

const checkChange = event => {
  console.log(event.target.name);
};

