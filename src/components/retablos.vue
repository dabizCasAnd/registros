<template>
    <!-- <div class="retablos-container">
        <b-button v-b-toggle.sidebar-right class="retablos-btn"><span>:Retablos</span></b-button>
        <b-sidebar id="sidebar-right" title="SISTEMA DE ORDEN" right shadow>
            <div class="retablos-sidebar px-3 py-2">
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
            </div>
        </b-sidebar>
    </div> -->
    <sidebar-menu :menu="menu" />
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'

export default {
    name: 'retablos',
    components: {
        SidebarMenu
    },
    data() {
        return {
            menu: [
                {
                    header: true,
                    title: 'Main Navigation',
                    hiddenOnCollapse: true
                },
                {
                    href: '/',
                    title: 'Dashboard',
                    icon: 'fa fa-user'
                },
                {
            href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/charts/sublink',
                title: 'Sub Link'
              }
            ]
          }
            ]
        }
    }
}
</script>
<style scoped>
    .retablos-container {
        position: absolute;
        right: 0;
        top: 20px;
    }
    .retablos-btn {
        height: 75%;
    }
    .retablos-btn span {
        display: inline-block;
        transform: rotate(-90deg);
    }
</style>