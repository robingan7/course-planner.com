import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { VALID_BLOCKS, VALID_TEXTBOOKS, VALID_PERIODS} from '../../data/imports/imports'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop:-5,
        marginRight:5,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3)
    },
    saveButton: {
        marginTop: 5,
        marginBottom:10
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const blocks = VALID_BLOCKS;
const textbooks = VALID_TEXTBOOKS;
const periods = VALID_PERIODS;

function getStyles(name, blockOptions, theme) {
    return {
        fontWeight:
            blockOptions.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Imports() {
    const classes = useStyles();
    const theme = useTheme();
    const [blockOptions, setBlockOptions] = React.useState([]);
    const [textbookOptions, setTextbookOptions] = React.useState([]);
    const [periodOptions, setPeriodOptions] = React.useState([]);

    const handleChange = name => event => {
        switch (name) {
            case "block":
                setBlockOptions(event.target.value);
                break;
            case "textbook":
                setTextbookOptions(event.target.value);
                break;
            case "period":
                setPeriodOptions(event.target.value);
                break;
            default:
                console.log("err in handleChange()");
        } 
    };

    const handleChangeMultiple = event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setBlockOptions(value);
    };

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Blocks</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={blockOptions}
                    onChange={handleChange("block")}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {blocks.map(name => (
                        <MenuItem key={name} value={name} style={getStyles(name, blockOptions, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Textbooks</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={textbookOptions}
                    onChange={handleChange("textbook")}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {textbooks.map(name => (
                        <MenuItem key={name} value={name} style={getStyles(name, blockOptions, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Periods</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={periodOptions}
                    onChange={handleChange("period")}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {periods.map(name => (
                        <MenuItem key={name} value={name} style={getStyles(name, blockOptions, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br/>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.saveButton}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
        </React.Fragment>
    );
}
