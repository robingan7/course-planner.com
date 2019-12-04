import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { VALID_BLOCKS, VALID_TEXTBOOKS, VALID_PERIODS} from '../../data/imports/imports'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop:5,
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
        marginBottom:10,
        marginLeft:12
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

export default function Imports(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { blockOption, textbookOption, updateImports, resources} = props;
    const [blockOptions, setBlockOptions] = React.useState(blockOption);
    const [textbookOptions, setTextbookOptions] = React.useState(textbookOption);
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

    const handleUpdate = () => {
        let copy = resources;
        let newInstacnes = [
            { id: "Default Class", text: "Default Class" }, 
            { id: "Off", text: "Off" }
        ];

        for (let ele of periodOptions) {
            newInstacnes.push({
                id: ele, 
                text: ele
            });
        }

        copy[getPeriodIndex(copy)].instances = newInstacnes;
        let output = {
            blocks: blockOptions,
            textbooks: textbookOptions,
            periods: copy
        }

        updateImports(output);
    }

    const getPeriodIndex = arr => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].fieldName === "period") {
                return i;
            }
        }
        return -1;
    }

    const filterPeriod = p => {
        p = p.filter(period => period.id !== "Off" && period.id !== "Default Class");
        let resultOptions = [];

        for(let ele of p) {
            resultOptions.push(ele.id);
        }
        return resultOptions;
    };

    const [periodOptions, setPeriodOptions] = React.useState(filterPeriod(resources[getPeriodIndex(resources)].instances));

    return (
        <React.Fragment>
            <div style={{marginLeft:12}}>
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
            </div>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.saveButton}
                startIcon={<SaveIcon />}
                onClick={handleUpdate}
            >
                Save
            </Button>
        </React.Fragment>
    );
}
